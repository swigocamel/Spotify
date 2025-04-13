// src/app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pino = require('pino')();
const pinoHttp = require('pino-http')({ logger: pino });
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var coachRouter = require('./routes/coaches');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pinoHttp);
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/coaches', coachRouter);

connectDB();  // 啟動時初始化 DB

app.use((err, req, res, next) => {
    if (req.log) { // 確保 req.log 存在
      req.log.error(err)
    }
    res.status(500).json({
      status: false,
      message: '伺服器錯誤'
    })
  })
  
module.exports = app;
