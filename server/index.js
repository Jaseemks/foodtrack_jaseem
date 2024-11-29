const express = require('express')
const { apiRouter } = require('./routes')
const { connectDB } = require('./config/db')
const cors = require('cors');
const app = express()
const port = 4000

app.use(cors({
  origin: "https://https://foodtrack-gamma.vercel.app/",
  // origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', apiRouter);

connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})