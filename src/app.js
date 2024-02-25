const express = require("express");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () =>{
    console.log(`Running in port ${PORT}`);
})
