const express = require("express")
const app = express()
const path = require("path")
const port = 3000
const mainRouter = require("./routers/mainRouter")
const userRouter = require("./routers/userRouter")
const productRouter = require("./routers/productRouter")

app.listen(port, () => console.log("Server up and running on the port " + port))

const publicPath = path.resolve(__dirname, "./public")
app.use(express.static(publicPath))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/", mainRouter)





