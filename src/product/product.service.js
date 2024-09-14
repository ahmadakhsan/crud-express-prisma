// service layer bertujuan untuk handle businees logic
// kenapa dipisah ? agar mempunyai tugas masing masing dan terisolate dan function
// reusable
// agar ketika ada perubahan untuk pakai orm, sisa di edit di file ini saja

const prisma = require("../db");
const { findProducts, insertProduct, findProductByName, editProduct, deleteProduct, findProductsById } = require("./product.repository");

const getAllProducts =  async () =>{
    const products = await findProducts();
    return products;
}

const getProductById = async (id) =>{
    const product = findProductsById(id);
    if(!product){
        throw Error("Product Not Found");
    }
    return product;
}

const createProduct = async (productData) => {
    const findProduct = await findProductByName(productData.name);

    if(findProduct){
        throw new Error("name has to be uniqiue")
    }
    const product = await insertProduct(productData);
    return product;
}

const deleteProductById = async (id)=>{

        await getProductById(id);
        await  deleteProduct(id);
}

const editProductById =  async (id, productData) =>{
    // await getProductById(id);
// //    const findProduct = await getProductById(id);

//     // if(!findProduct){
//     //     throw Error("Product not found");
//     //     // return res.status(400).send("product not found")
//     // }

    
//     const product = await editProduct(id, productData);
    await getProductById(id);
    const product = await editProduct(id, productData)
    return product;
}



module.exports ={
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
}