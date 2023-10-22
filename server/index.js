import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();

import authRoutes from './routes/authRoute.js'


const app = express();

//MiddleWare
app.use(express.json())
app.use(cookieParser);
app.use(express.urlencoded({extended:false}));

app.use('/', authRoutes)



const PORT = 8000;

//Database Connection
mongoose.connect(process.env.Mongo_Uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });