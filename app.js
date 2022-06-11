//******* Require´s *******
const express = require("express");
const app = express();
const path = require("path");
const morgan = require('morgan');
const methodOverride =  require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');

//******* Server Configuration *******
const port = 3000;
const publicPath = path.resolve(__dirname, "./public");
const sessionSecret = 'Scaloneta 2022';

//******* Middlewares *******
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({secret: sessionSecret}));
app.use(cookies());
app.use(userLoggedMiddleware);

//******* Template engine *******
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src/views"));

//******* Route System Configuration *******
const mainRouter = require("./src/routers/mainRouter");
const userRouter = require("./src/routers/userRouter");
const productRouter = require("./src/routers/productRouter");
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/", mainRouter);

//******* Starting Server *******
app.listen(port, () => console.log("Server up and running on the port " + port));







