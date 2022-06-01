//******* Require´s *******
const express = require("express");
const app = express();
const path = require("path");
const morgan = require('morgan');
const methodOverride =  require('method-override');

//******* Server Configuration *******
const port = 3000;
const publicPath = path.resolve(__dirname, "./public");

//******* Middlewares *******
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

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







