const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/ProductManager.js");
const productManager = new ProductManager("./products.json")

const products = []
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProduct()
        if (limit) {
            res.json(products.slice(0,limit));
        } else {
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({error: "internal server error"})
    }
})

router.get("/:pid", async (req, res) => {
     
    try {
        let id =req.params.pid;
        const product = await productManager.getProductById (parseInt(id));

        if (!product) {
            return res.json({error: "ID not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Interal server error"})
    }
})

router.post("/", (req, res) => {
    
    const newProduct = req.body;

    const postProduct = productManager.addProduct (newProduct)

    console.log(newProduct);

    products.push(newProduct);
    
    res.send({status:"succes", message: "Product added correctly"});
})

module.exports = router;
