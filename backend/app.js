// src/app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pino = require('pino')();
const pinoHttp = require('pino-http')({ logger: pino });
const cors = require('cors');
const connectDB = require('./db/connectDB');

require('dotenv').config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');
var coachRouter = require('./routes/coaches');
var testRouter = require('./routes/test');

var app = express();
//pr test
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pinoHttp);
app.use(cors());

app.use('/', indexRouter);
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/coaches', coachRouter);
app.use('/api/test', testRouter);

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
