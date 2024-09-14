//layer untuk handle request dan response 
//biasanya juga handle validasi body

const express = require ('express');
const prisma = require("../db");

const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require('./product.service');

const router = express.Router();


router.get("/", async (req, res)=>{
    const products = await getAllProducts();
    res.json(products);

});

router.get("/:id", async (req, res)=>{

    try{
        const productId = parseInt(req.params.id);
        const product = await getProductById(parseInt(productId));

        res.send(product);
    } catch (err){
    
        res.status(400).send(err.message);
    }
});


router.post("/", async (req, res) => {

    try {
        const productData = req.body
        const product = await createProduct(productData);
        res.send({
            data : product,
            message : "create product success"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.delete("/:id", async (req, res)=>{

    try {
        const productId = req.params.id;
        await deleteProductById(parseInt(productId));
        res.send("product deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.put("/:id", async (req, res)=>{

   const  productId = req.params.id
   const productData = req.body;

   if (
      !(
        productData.name && 
        productData.description && 
        productData.image && 
        productData.price
       )
    ){
        return res.status(400).send("Some fields are missing");
   }

   try {
        const product = await editProductById(parseInt(productId), productData);
        res.send({
            data : product,
            massage : "edit data success"
        });
    
   } catch (error) {
        res.status(400).send(error.message);
   }
});


router.patch("/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const product = await editProductById(parseInt(productId), productData);
      res.send({
        data: product,
        message: "edit product success",
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
});



module.exports = router
