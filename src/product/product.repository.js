// berkomunikasi dengan database
// bisa menggunakan orm atau row query

const prisma = require("../db")
 
const findProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const findProductsById = async (id) => {
    const product = await prisma.product.findUnique({
        where : {
            id,
        }
    });
    return product;
}

const findProductByName  = async (name) =>{
    const product = await prisma.product.findFirst({
        where:{
           name
        }
    })
    return product;
}

const insertProduct = async (productData)=>{
    const price= parseInt(productData.price);

    const product = await prisma.product.create({
        data :{
           name : productData.name,
           price: price,
           description: productData.description,
           image: productData.image,
        },
    });
    return product;
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
    where :{ id },
    });
}


const editProduct = async (id, productData) => {

    const priceCovert = productData.price ? parseInt(productData.price) : productData.price;
    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description: productData.description,
        image: productData.image,
        name: productData.name,
        price: priceCovert,
      },
    });
    return product;
};
  


module.exports = {
    findProducts,
    findProductsById,
    insertProduct,
    findProductByName,
    deleteProduct,
    editProduct,
};