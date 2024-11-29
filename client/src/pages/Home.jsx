// import React, { useState, useEffect } from 'react';
// import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import './Home.css';
// import { axiosInstance } from '../config/axiosInstance';

// export const Home = () => {
//   const [markedDates, setMarkedDates] = useState([]);

//   useEffect(() => {
//     const fetchMarkedDates = async () => {
//       try {
//         const response = await axiosInstance.get('/marker/getmarked');
//         const data = Array.isArray(response.data.data) ? response.data.data : [];
//         const formattedDates = data.map(item => item.date.slice(0, 10));
//         setMarkedDates(formattedDates);
//       } catch (error) {
//         console.error('Error fetching marked dates:', error);
//       }
//     };
//     fetchMarkedDates();
//   }, []);

//   const handleDateClick = async (info) => {
//     const clickedDate = info.dateStr;
//     alert('You clicked on: ' + clickedDate);

//     const data = {
//       mark: "true",
//       date: clickedDate,
//       userid: "6746c571e408b0e2c08f28a4"
//     };

//     try {
//       await axiosInstance.post('/marker/newmark', data);
//     } catch (error) {
//       console.error('Error sending data:', error);
//     }
//   };

//   const dayCellClassNames = (arg) => {
//     const day = arg.date.toISOString().slice(0, 10);
//     const isMarked = markedDates.includes(day);
//     return isMarked ? 'red-date' : '';
//   };

//   return (
//     <>
//       <div>
//         <Header />
//       </div>
//       <div className="min-h-screen">
//         <FullCalendar
//           key={markedDates.join(',')}
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           timeZone="UTC"
//           locale="en"
//           selectable={true}
//           dateClick={handleDateClick}
//           dayCellClassNames={dayCellClassNames}
//         />
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Home.css';
import { axiosInstance } from '../config/axiosInstance';

export const Home = () => {
  const [markedDates, setMarkedDates] = useState([]);
  const [calculationResult, setCalculationResult] = useState(0);
  const [rate, setRate] = useState('');  // State for the food rate input

  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        const response = await axiosInstance.get('/marker/getmarked');
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        const formattedDates = data.map(item => item.date.slice(0, 10));
        setMarkedDates(formattedDates);
        calculateRemainingDays(formattedDates, rate);  // Calculate on fetch with initial rate
      } catch (error) {
        console.error('Error fetching marked dates:', error);
      }
    };
    fetchMarkedDates();
  }, []);

  useEffect(() => {
    if (rate) {
      calculateRemainingDays(markedDates, rate);  // Recalculate if rate changes
    }
  }, [rate, markedDates]);

  const handleDateClick = async (info) => {
    const clickedDate = info.dateStr;
    alert('You clicked on: ' + clickedDate);

    const data = {
      mark: "true",
      date: clickedDate,
      userid: "6746c571e408b0e2c08f28a4"
    };

    try {
      await axiosInstance.post('/marker/newmark', data);
      setMarkedDates(prevMarkedDates => [...prevMarkedDates, clickedDate]);
      calculateRemainingDays([...markedDates, clickedDate], rate);  // Recalculate after new mark
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const calculateRemainingDays = (markedDates, rate) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get current month (0-11)
    const currentYear = currentDate.getFullYear();

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Count how many marked dates fall in the current month
    const markedInCurrentMonth = markedDates.filter(date => {
      const dateObj = new Date(date);
      return dateObj.getMonth() === currentMonth && dateObj.getFullYear() === currentYear;
    }).length;

    // Calculate the remaining days and the result
    const remainingDays = daysInMonth - markedInCurrentMonth;
    const result = remainingDays * (rate); // Multiply by rate or 55 if no rate is entered
    setCalculationResult(result);
  };

  const dayCellClassNames = (arg) => {
    const day = arg.date.toISOString().slice(0, 10);
    const isMarked = markedDates.includes(day);
    return isMarked ? 'red-date' : '';
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="min-h-screen">
        <FullCalendar
          key={markedDates.join(',')}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          timeZone="UTC"
          locale="en"
          selectable={true}
          dateClick={handleDateClick}
          dayCellClassNames={dayCellClassNames}
        />
      </div>
      <div className="calculation-result text-3xl font-bold text-blue-700 flex">
        Food Rate per Day:
        <div className="ml-3">
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}  // Bind rate input
            className="w-32 text-base px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter rate"
          />
        </div>
        <div className="ml-5">
          Total Amount for the month: {calculationResult}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
