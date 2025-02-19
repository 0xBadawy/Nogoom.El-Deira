import express from 'express';
import event from './Routes/event-routes.js';
import category from './Routes/category.js';
import homeRoute from './Routes/home-route.js';
import preferencesRoute from './Routes/preferences-route.js';
import contactRoute from "./Routes/contact-route.js";
import settingsRoute from "./Routes/settings-route.js";
import notificationsRoute from "./Routes/notifications-route.js";
import advertisementRoute from "./Routes/advertisement-route.js";

import userRoute from "./Routes/users.js";
import authRoute from "./Routes/auth.js";
import Post from './models/schema.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import ApiError from './utils/apiError.js';
import dbConnection from './config/database.js';
import globalError from './middleware/errorMiddleware.js';

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//  ---------------------- Routes ----------------------
app.get('/', (req, res) => {
  res.send('Hello, Badawy (: !');
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/notifications", notificationsRoute);
app.use("/api/v1/advertisement", advertisementRoute);


app.use('/event', event);
app.use("/api/v1/category", category);
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/home', homeRoute);
app.use("/api/v1/preferences", preferencesRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/settings", settingsRoute);
app.get("/api/v1/dashboard", settingsRoute);


app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalError);
dbConnection();
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Events ==> handling unhandledRejection and uncaughtException
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    console.log('Server is closed!');
    process.exit(1);
  });
}
);