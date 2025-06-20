require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connection = require('./config/dbConfig');
const cookieParser = require('cookie-parser')
const https = require("https")
const path = require("node:path");
const app = express();
const cron = require("cron")
const PORT = process.env.PORT || 8080;

const errorHandler = require('./middlewares/errorHandler');
const credentials = require('./middlewares/credentials')
const corsConfig = require('./config/corsConfig');


const payStack = require('./routes/paystack');
const userRoutes = require('./routes/user.router')
const adminRoutes = require('./routes/admin.router');
const verify = require('./middlewares/verify');
const adminOnly = require('./middlewares/adminOnly');


//middleware
app.set('trust proxy', 1)
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(credentials)
app.use(cors({
  origin: ["https://project-ecom-1.onrender.com","http://localhost:5173","http://localhost:8081", "http://localhost:3000"],
  credentials: true
  }));
app.use(cookieParser())
app.use(morgan('tiny'))

const job = new cron.CronJob("*/12 * * * *", () => {
  
  https
    .get(`${process.env.BACKEND_URL}/api/products`, (res) => {
      if (res.statusCode === 200) console.log("Success");
      else console.log("Error");
    })
    .on("error", (err) => {
      console.log("error sending req", err);
    });
});

// Start the cron job
job.start();

//session config
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'yourSecret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 24 * 60 * 60, // 1 day
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    })
  );

// routes
app.get("/", async (req, res) => {
  res.send("req is sending");
});

app.use('/api',userRoutes)
app.use(payStack);
app.use(verify)
app.use(adminOnly)
app.use('/admin',adminRoutes)


//errors
app.use(errorHandler)

app.listen(PORT,()=>{
    connection();
    console.log(`server is running on port ${PORT}`);
})
