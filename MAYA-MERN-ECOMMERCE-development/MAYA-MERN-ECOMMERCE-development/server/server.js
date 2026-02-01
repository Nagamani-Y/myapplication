const express = require("express");
const app = express();
app.use(express.json())
require("dotenv").config();

const port = process.env.SERVER_PORT;


let dbConnection = require('./dbConnect');
let productsRoute = require("./routes/productsRoute")
let usersRoute = require("./routes/usersRoute")
let paymentRoute = require('./routes/paymentRoute')
app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/user', usersRoute);
app.use('/api/orders', paymentRoute);
app.get('/', (req, res) => {
    res.send("i'm ready now");
});

app.listen(port, () => console.log("i'm listening"));