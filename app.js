//******* Require´s *******
const express = require("express");
const app = express();
const path = require("path");
const morgan = require('morgan');
const methodOverride =  require('method-override');
const mainRouter = require("./routers/mainRouter");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");

//******* Server Configuration *******
const port = 3000;
const publicPath = path.resolve(__dirname, "./public");

//******* Middlewares *******
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

//******* Template engine *******
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

//******* Starting Server *******
app.listen(port, () => console.log("Server up and running on the port " + port));

//******* Route System Configuration *******
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/", mainRouter);





