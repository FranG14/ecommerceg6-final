const Product = require("./../models/Product");
const asyncHandler = require("express-async-handler");
const Stock = require("../models/Stock");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const { where } = require("../models/Order");


// @desc    Fetch all products
// @route   GET localhost:3001/products
// @access  Public
const getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = req.query.pageSize || 12;
  const page = req.query.page || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate("categories")
    .populate("productReview")
    .populate("stock")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (req.query.keyword) {
    res.json({ products, current: page, pages: Math.ceil(count / pageSize), keyword: true });
  }
  else {
    res.json({ products, current: page, pages: Math.ceil(count / pageSize), keyword: false });
  }
});

const getProductsById = (req, res) => {
  Product.findById(req.params.id)
    .populate("productReview")
    .populate("stock")
    .then((product) => {
      if (!product) {
        return res.status(404).end();
      }
      return res.status(200).json(product);
    });
};

//filtra por brand, size,color,genre
const getProductsFilter = (req, res, next) => {
  let filter = req.query.brand || req.query.size || req.query.genre || req.query.price;
  let keyword;
  let filterPrice
  if (filter == "price") {
    filterPrice = {
      field: req.query.price
    }
  }
  if (filter !== "") {
    keyword = {
      brand: {
        $regex: req.query.brand,
        $options: "i",
      }, size: {
        $regex: req.query.size,
        $options: "i",
      },
      genre: {
        $regex: req.query.genre,
        $options: "i",
      },
    }
  } else {

    keyword = {}
  }
  Product.find({ ...keyword }).sort({ price: req.query.price })
    .populate("categories")
    .then(answer => {
      // console.log("ANSWER", answer)
      if (req.query.category) {
        let productsCategories = [];
        if (answer && answer.length > 0) {
          for (let i = 0; i < answer.length; i++) {
            if (answer[i].categories.find(cat => cat.name === req.query.category)) {
              productsCategories.push(answer[i]);
            }
          }
        }


        return res.status(200).json({ products: productsCategories });
      }

      res.status(200).json({ products: answer });
    })
    .catch(err => {
      res.status(404).json({ messege: "Product doesn't exist", err: err });
    })

}


//filtrado por categoria
const getProductsFilterByCategory = (req, res) => {
  const name = req.params.name;

  Product.find({})
    .populate("categories")
    .then(answer => {
      let productsCategories = [];
      if (answer && answer.length > 0) {
        for (let i = 0; i < answer.length; i++) {
          if (answer[i].categories.find(cat => cat.name === name)) {
            productsCategories.push(answer[i]);
          }
        }
      }
      res.status(200).json({ products: productsCategories });
    })
    .catch(err => {
      res.status(404).json({ messege: "Product doesn't exist", err: err });
    })
}


/*  */


// @desc    Create a product
// @route   POST localhost:3001/products
// @access  Private/Admin

const addProducts = async (req, res) => {
  try {
    const { name, price, brand, description, stock, size, color, categories, genre, productReview } =
      req.body;
    let images = [];
    const categoriesArray = categories.split(",")
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }
    }
    let colorArray = color.split(",");
    let sizeArray = size.split(",");
    let stockArray = stock.split(",");
    let stockId = []

    if (colorArray && colorArray.length > 0) {
      colorArray.map((c, i) => {
        const newStock = Stock({
          _id: new mongoose.Types.ObjectId(),
          colorName: c,
          sizeName: sizeArray[i],
          stock: stockArray[i]
        })
        newStock.save();
        stockId.push(newStock._id);
      })
    }

    const product = Product({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      price: price,
      brand: brand,
      description: description,
      stock: stockId,
      genre: genre,
      // size: size,
      // color: colorId,
      categories: categoriesArray,
      img: images,
      productReview: Product._id
    });

    const productStored = await product.save();

    res.status(201).send({ product });
  } catch (e) {
    res.status(500).send({ message: e.errors });
  }
};

const imagaUpaload = (req, res) => {
  let getImage;
  const { name } = req.params;
  const images = name.split(",")
  let pathImage = path.join(__dirname, "../");
  try {
    if (images.length > 0) {
      getImage = fs.readFileSync(`${pathImage}uploads/${images[0]}`);
    }
    else {
      getImage = fs.readFileSync(`${pathImage}uploads/${images[0]}`);
    }
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads/noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};

// @desc    Update a product
// @route   PUT localhost:3001/products/:id
// @access  Private/Admin
const updateProducts = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    categories,
    description,
    price,
    genre,
    stock,
    rating,
    size,
    color,
  } = req.body;
  const categoryArray = categories?categories.split(","):""
  let images = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i].filename);
    }
  }
  let colorArray = color.split(",");
  let sizeArray = size.split(",");
  let stockArray = stock.split(",");
  let stockId = []
  
  if (colorArray && colorArray.length > 0) {
    colorArray.map((c, i) => {
      const newStock = Stock({
        _id: new mongoose.Types.ObjectId(),
        colorName: c,
        sizeName: sizeArray[i],
        stock: stockArray[i]
      })
      newStock.save();
      stockId.push(newStock._id);
    })
  }
  const product = await Product.findById(req.params.id);
  if (product) {

    if(name) (product.name = name)
      if(brand) (product.brand = brand)
      if(categoryArray !== "")(product.categories = categoryArray)
      if(description)(product.description = description)
      if(price)(product.price = price)
      if(stockId){
        let newStock = product.stock
        stockId.map(s => newStock.push(s))
        product.stock = newStock;
      }
      if(rating)(product.rating = rating)
      if(genre)(product.genre = genre)
      if(images)(product.img = images)

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Porduct not found");
  }
});

const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const stock = await Stock.findById(id);
  if (stock) {
    stock.stock = quantity;
    await stock.save();
    return res.sendStatus(200);
  }
  res.sendStatus(400);
})

const removeProductStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const stock = await Stock.findById(id);
  if (stock) {
    await stock.remove();
    return res.sendStatus(200);
  }
  res.sendStatus(400);
});

// @desc    Delete a product by id
// @route   DELETE localhost:3001/products/:id
// @access  Private/Admin
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ messege: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Porduct not found");
  }
});

module.exports = {
  getProducts,
  getProductsFilter,
  getProductsFilterByCategory,
  addProducts,
  updateProducts,
  updateStock,
  removeProductStock,
  deleteProducts,
  getProductsById,
  imagaUpaload,
};
