const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const { checkToken } = require('./middlewares/checkToken');


require('dotenv').config();
const app = express();
const corsOptions = {
  origin: ["https://armentas-shop-db.web.app/", "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  allowedHeaders: ['Accept', 'Referer', 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods'],
  optionsSuccessStatus: 200
};

// view engine setup ----------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares ----------------------------------------------------------------------------
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes ---------------------------------------------------------------------------------
// Dashboard
app.use('/', require('./routes/index'));
app.use('/api/dashboard/auth', require('./routes/dashboard/auth.routes'));
app.use('/api/dashboard/products', require('./routes/dashboard/products.routes'));
app.use('/api/dashboard/collections', require('./routes/dashboard/collections.routes'));
app.use('/api/dashboard/categories', require('./routes/dashboard/categories.routes'));
app.use('/api/dashboard/colors', require('./routes/dashboard/colors.routes'));
app.use('/api/dashboard/images', require('./routes/dashboard/images.routes'));
app.use('/api/dashboard/discounts', require('./routes/dashboard/discounts.routes'));
app.use('/api/dashboard/dash', checkToken, require('./routes/dashboard/dash.routes'));
// Shop
app.use('/api/shop/products', require('./routes/shop/products.routes'));
app.use('/api/shop/payment', require('./routes/shop/payment.routes'));
app.use('/api/shop/collections', require('./routes/shop/collections.routes'));
app.use('/api/shop/categories', require('./routes/shop/categories.routes'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
