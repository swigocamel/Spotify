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

connectDB();  // 啟動時初始化 DB

module.exports = app;
