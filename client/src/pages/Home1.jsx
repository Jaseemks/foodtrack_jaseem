// import React from 'react';
// import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import './Home.css';
// import { axiosInstance } from '../config/axiosInstance';  // Assuming axiosInstance is already set up

// export const Home = () => {
//   const handleDateClick = async (info) => {
//     // Extract the clicked date from FullCalendar
//     const clickedDate = info.dateStr;
//     alert('You clicked on: ' + clickedDate);

//     // Prepare data to send in the API request
//     const data = {
//       mark: "true",
//       date: clickedDate,  // Using the clicked date from FullCalendar
//       userid: "6746c571e408b0e2c08f28a4"  // Example user ID
//     };

//     try {
//       // Send a POST request with the data
//       const response = await axiosInstance.post('/marker/newmark', data);

//       // Handle response data (optional)
//       console.log('Response:', response.data);
//     } catch (error) {
//       // Handle error
//       console.error('Error sending data:', error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <Header />
//       </div>
//       <div className="min-h-screen">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           locale="en"
//           selectable={true}
//           dateClick={handleDateClick}  // Call handleDateClick on date click
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

export const Homekkkk = () => {
  const [markedDates, setMarkedDates] = useState([]); // State to store marked dates

  // Fetch marked dates from the API when the component mounts
  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        const response = await axiosInstance.get('/marker/getmarked');
        console.log("Fetched marked dates from API:", response.data.data);

        const data = Array.isArray(response.data.data) ? response.data.data : [];
        console.log('Processed data:', data);

        // Convert API response dates to 'YYYY-MM-DD' format for comparison
        const formattedDates = data.map(item => item.date.slice(0, 10)); // Assuming 'date' is in ISO format
        console.log('Formatted dates for comparison:', formattedDates);

        setMarkedDates(formattedDates); // Store the formatted dates
      } catch (error) {
        console.error('Error fetching marked dates:', error);
      }
    };

    fetchMarkedDates();
  }, []); // Empty dependency array ensures this runs only on mount

  const handleDateClick = async (info) => {
    const clickedDate = info.dateStr;
    console.log('Clicked date:', clickedDate);

    // Check if the clicked date is already marked
    if (markedDates.includes(clickedDate)) {
      alert('This date is already marked.');
      return; // Prevent sending duplicate requests
    }

    // Prepare data to send in the API request
    const data = {
      mark: "true",
      date: clickedDate,  // Using the clicked date from FullCalendar
      userid: "6746c571e408b0e2c08f28a4"  // Example user ID
    };

    try {
      // Send a POST request with the data
      const response = await axiosInstance.post('/marker/newmark', data);
      console.log('Response:', response.data);

      // Update the marked dates after successfully marking
      setMarkedDates((prevDates) => [...prevDates, clickedDate]);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  // Function to determine if a date is marked
  const isDateMarked = (date) => {
    console.log('Checking if date is marked:', date); // Log the date being checked
  
    if (!date) {
      console.error('Date is undefined or null!');
      return false;
    }
  
    const formattedDate = date.slice(0, 10); // Format date as 'YYYY-MM-DD'
    console.log('Formatted date for comparison:', formattedDate);
    
    const result = markedDates.includes(formattedDate); // Check if it's in the marked dates array
    console.log('Is date marked?', result); // Log the result
    return result;
  };
  

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="min-h-screen">
      // Inside the FullCalendar component
      <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  locale="en"
  selectable={true}
  dateClick={handleDateClick}  // Call handleDateClick on date click
  dayCellClassNames={(args) => {
    // Log the full args object to see what data is available
    console.log('FullCalendar args object:', args);

    // Ensure that 'args.date' is a valid Date object
    if (args && args.date) {
      // Format the date as 'YYYY-MM-DD' to compare with marked dates
      const formattedDate = args.date.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
      console.log('Formatted date:', formattedDate);

      // Check if the formatted date is marked
      if (isDateMarked(formattedDate)) {
        return 'marked-date';  // Add class if the date is marked
      }
    } else {
      console.error('args.date is undefined or invalid');
    }

    return '';  // Default return value if no class
  }}
/>


      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

