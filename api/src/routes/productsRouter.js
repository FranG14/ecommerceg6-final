const server = require("express").Router();
const upload = require('./../libs/storage');
const { isAuthenticated, isAdmin } = require('./../middlewares/customMiddlewares');

const {
  addProducts,
  getProductsFilter,
  getProductsFilterByCategory,
  getProducts,
  updateProducts,
  updateStock,
  removeProductStock,
  deleteProducts,
  getProductsById,
  imagaUpaload
} = require("../controllers/productController");


server.get("/", getProducts);
server.get("/:filterName", getProductsFilter)
server.get("/category/:name", getProductsFilterByCategory)
server.get("/:id", getProductsById)
server.get("/detail/:id", getProductsById)
server.post("/",upload.array("img"), addProducts);
server.put("/:id",upload.array("img"),updateProducts);
server.put("/stock/:id",updateStock);
server.delete("/:id",deleteProducts);
server.delete("/delete/stock/:id",removeProductStock );
server.get('/image/:name', imagaUpaload)

module.exports = server;
