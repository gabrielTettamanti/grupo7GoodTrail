const express = require("express")
const app = express()
const path = require("path")
const port = 3000
const mainRouter = require("./routers/mainRouter")

app.listen(port, () => console.log("Server up and running on the port " + port))

const publicPath = path.resolve(__dirname, "./public")
app.use(express.static(publicPath))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use("/", mainRouter)




