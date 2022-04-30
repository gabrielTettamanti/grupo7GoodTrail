const express = require("express")
const app = express()

const path = require("path")

const publicPath = path.resolve(__dirname, "./public")
app.use(express.static(publicPath))

const port = 3000
app.listen(port, () => console.log("Server up and running on the port " + port))

app.get("/", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})
app.get("/productDescription", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/productDescription.html"))
})
app.get("/buyCart", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/buyCart.html"))
})
app.get("/login", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/login.html"))
})
app.get("/registerFormulary", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/registerFormulary.html"))
})
app.get("/experienceCatalog", (req,res) => {
    res.sendFile(path.resolve(__dirname, "./views/experienceCatalog.html"));
});
app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/notFound.html"))
})