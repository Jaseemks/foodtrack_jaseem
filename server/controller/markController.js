const { Mark } = require("../models/markerModel");


const createMark = async (req, res, next) => {
    try {
        console.log(req.body);

        const { mark,date,userid } = req.body;

        if (!mark || !date || !userid) {
            return res.status(400).json({ success: false, message: 'All fields required' });

        }

        const newMark = new Mark({ mark,date,userid })
        await newMark.save();

        res.json({ success: true, message: " marked successfully" })

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error || 'internal server error' })

    }
}


const cancelMark = async (req, res, next) => {
    try {
        const { date } = req.params;
        const { userid } = req.body; // If needed
        console.log(`Canceling mark for date: ${date} and user: ${userid}`);
    
        // Logic to find and delete the mark
        await Mark.deleteOne({ date, userid });
    
        res.status(200).json({ success: true, message: 'Mark canceled successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
      }
};


const getMark = async (req, res, next) => {
    try {
        console.log('Fetching marked data...');
        
        // Fetch all marks from the Mark collection
        const data = await Mark.find();

        // Format the dates to 'YYYY-MM-DD' format before sending the response
        const formattedData = data.map(entry => {
            return {
                ...entry.toObject(),
                date: entry.date.toISOString().split('T')[0] // Format the date to 'YYYY-MM-DD'
            };
        });

        console.log('Fetched data:', formattedData);

        // Send the response
        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: formattedData
        });

    } catch (error) {
        console.error('Error fetching data:', error);

        // Send error response
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};


module.exports = {createMark,getMark,cancelMark}