import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { app, server } from './SocketIO/server.js';


dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploadsUniv', express.static('uploadsUniv'));

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URL;

try{
    mongoose.connect(URI)
    console.log("Connected to db");
}
catch(error) {
    console.log(error);
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute)


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})