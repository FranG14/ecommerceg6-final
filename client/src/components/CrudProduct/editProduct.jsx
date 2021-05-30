import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getCategories, getCategoryById } from "./../../redux/actions/category_actions";
import { detailProduct, editProduct } from "./../../redux/actions/products_actions";
import "../Catalog/catalog.css";
import swal from 'sweetalert';
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";


const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const categoryArray = useSelector(
    (state) => state.categoriesReducer.categories.list.categories);

  const categoryPreview = useSelector(
    (state) => state.categoriesReducer.categories.category);
  const productPreview = useSelector(
    (state) => state.productsReducer.allProducts);

  useEffect(() => {
    dispatch(getCategories());

    if (id) {
      dispatch(detailProduct(id));
    }

    if (productPreview.categories && productPreview.categories[0]) {
      console.log("entra")
      dispatch(getCategoryById(productPreview.categories[0]))
    }
  }, [id, dispatch]);

  const [product, setProduct] = useState({
    id: id,
    name: "",
    brand: "",
    category: [],
    description: "",
    price: "",
    genre: "",
    size: [],
    color: [],
    stock: "",
    img: "",
  });

  const [selectedName, setSelectedName] = useState({ categoryName: [] });

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = () => {
    let select = document.getElementById("categoryId");

    if (select) {
      let selectValue = select.options[select.selectedIndex].value;
      let selectedCategoryNames =
        select.options[select.selectedIndex].innerText;
      let selectCategoryName = selectedName.categoryName.concat(
        selectedCategoryNames + " "
      );
      setSelectedName({ ...selectedName, categoryName: selectCategoryName });
      setProduct({ ...product, category: product.category.concat(selectValue) });
    }

  };
  //TERMINAR ESTA WEAAA!
  const deleteCateg = (e) => {
    let filterCategory = []
    selectedName.categoryName.map(cate => {
      if(cate !== e.target.innerText){
        filterCategory.push(cate);
      }
    });
    setSelectedName({categoryName: filterCategory})
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (product.name == '') return swal({
      title: "Name Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.color == '') return swal({
      title: "Color Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.stock == '') return swal({
      title: "Strock Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.price == '') return swal({
      title: "Price Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.brand == '') return swal({
      title: "Brand Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.description == '') return swal({
      title: "Description Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.category == '') return swal({
      title: "Category Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (selectedFile === null) return swal({
      title: "Image Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    //--------------------------------------------------------
    let extension;
    if (selectedFile.length > 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        extension = selectedFile[i].name.split(".");
        fd.append(
          "img",
          selectedFile[i],
          product.name + "." + extension[1]
        );
      }
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    fd.append("id", product.id);
    fd.append("name", product.name);
    fd.append("genre", product.genre);
    fd.append("brand", product.brand);
    fd.append("categories", product.category);
    fd.append("description", product.description);
    fd.append("price", product.price);
    fd.append("size", product.size);
    fd.append("color", product.color);
    fd.append("stock", product.stock);

    const payload = { id: product.id, data: fd }

    dispatch(editProduct(payload, config));
    alert("Activity successfullty edited");
  };
  return (
    <div>
      <UniversalNavBar />

      <div className="grid grid-cols-2 gap-2 bg-gray-200">
        <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  Edit Product
                </h1>
              </div>
              <div className="m-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      for="name"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Product
                    </label>
                    <input
                      id="product"
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      placeholder="Product"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="color"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Color
                    </label>
                    <input
                      id="color"
                      type="text"
                      name="color"
                      placeholder="Color"
                      value={product.color}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  {/* genre */}
                  <div>
                    <div className="mb-1"><label for="genres" className="text-sm text-gray-600 dark:text-gray-400">Genres</label></div>
                    <label className="inline-flex items-center mt-3">
                      <input type="checkbox" name="genre" value="men" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">Men</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                      <input type="checkbox" name="genre" value="woman" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">Woman</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                      <input type="checkbox" name="genre" value="unisex" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">Unisex</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                      <input type="checkbox" name="genre" value="boys" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">boys</span>
                    </label><label className="inline-flex items-center mt-3">
                      <input type="checkbox" name="genre" value="girls" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700">girls</span>
                    </label>
                  </div>
                  {/* genre end */}
                  <div className="mb-6">
                    <label
                      for="stock"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Stock
                    </label>
                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleInputChange}
                      placeholder="Stock"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="price"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={product.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                  dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="size"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Size
                    </label>
                    <input
                      id="size"
                      type="text"
                      name="size"
                      value={product.size}
                      onChange={handleInputChange}
                      placeholder="Size"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                      focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                   dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                   dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="brand"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Brand
                    </label>
                    <input
                      id="brand"
                      type="text"
                      name="brand"
                      value={product.brand}
                      onChange={handleInputChange}
                      placeholder="Brand"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                      focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                   dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                   dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="description"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      placeholder="Product Description"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                  focus:ring focus:ring-indigo-100 
                                  focus:border-indigo-300 dark:bg-gray-700 
                                  dark:text-white dark:placeholder-gray-500 
                                  dark:border-gray-600 dark:focus:ring-gray-900 
                                  dark:focus:border-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="category"
                      className="block text-xs font-semibold text-gray-600 mt-2 uppercase"
                    >
                      Category
                    </label>
                    <label className="label-select">
                      <select id="categoryId" onChange={handleSelect} className ="mb-2">
                        <option value="">--- category ---</option>
                        {categoryArray && categoryArray.length > 0
                          ? categoryArray.map((c, id) => {
                            return (
                              <option key={id} value={c._id}>
                                {c.name}
                              </option>
                            );
                          })
                          : ""}
                      </select><br/>
                      {selectedName.categoryName.length > 0 ? selectedName.categoryName.map((cate, key) => {
                        return <p onClick={deleteCateg} key={key} className="inline-block mr-2 rounded round bg-gray-200 mb-2 w-20 text-center">
                          {cate}
                        </p>
                      }) : ""}
                      <p className="text-sm mt-2 -mb-2">Can't find your Category? <Link to='/postCategory' className="underline text-sm text-blue-800">Add New One</Link></p>
                    </label>
                  </div>
                  <div className="mb-6">
                    <label
                      for="img"
                      className="block text-xs font-semibold text-gray-600 mt-2 uppercase"
                    >
                      Images
                    </label>
                    <label className="label-select">
                      <input type="file" onChange={handleFileInputChange} multiple />
                    </label>
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Edit Product
                    </button>
                  </div>
                  <p className="text-base text-center text-gray-400" id="result"></p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* CARD ORIGINAL*/}

        <div className="mt-40">
          <div className="bg-gray-200 dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-</div>sm">
                <div className=" justify-center justify-items-center content-center items-center">
                  <div className="card flex justify-center">
                    <img
                      src={`http://localhost:3001/products/image/${productPreview.img}`}
                      alt="https://i.stack.imgur.com/y9DpT.jpg"
                      style={{ height: "200px", width: "250px" }}
                    />
                    <div className="bg-gray-200" style={{ height: "1px" }}></div>
                    <div className="p-4">
                      <p className="text-black">{productPreview.name}</p>
                      <p className="text-blue-300">${productPreview.price}</p>
                      <p className="text-blue-300">{productPreview.brand}</p>
                      <div>
                        {/* {productPreview.categories && productPreview.categories.length > 0 ?
                          productPreview.categories.map((category,key)=>
                          {return <p className="text-blue-300 bg-blue-50">{console.log("asdsad",category)}</p>}) :""} */}
                        {/* <p className="text-blue-300 bg-blue-50">{productPreview}</p> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* CARD DE PREVIZUALIZACION */}
          <div className="bg-gray-200 dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-</div>sm">
                <div className=" justify-center justify-items-center content-center items-center">
                  <div className="card justify-center">
                    <div className="flex justify-center">
                      <img
                        src={imgUrl}
                        alt={imgUrl}
                        style={{ height: "200px", width: "250px" }}
                      />
                    </div>
                    <div className="bg-gray-200" style={{ height: "1px" }}></div>
                    <div className="p-4">
                      <p className="text-black">{product.name}</p>
                      <p className="text-black">{product.color}</p>
                      <p className="text-black">{product.stock}</p>
                      <p className="text-black">{product.size}</p>
                      <p className="text-black">{product.brand}</p>
                      <p className="text-black">{product.description}</p>
                      <p className="text-blue-300">${product.price}</p>
                      <div>
                        {/* {productPreview.categories && productPreview.categories.length > 0 ?
                          productPreview.categories.map((category,key)=>
                          {return <p className="text-blue-300 bg-blue-50">{console.log("asdsad",category)}</p>}) :""} */}
                        {/* <p className="text-blue-300 bg-blue-50">{productPreview}</p> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* FIN DE CARD DE PREVIZUALIZACION */}
        </div>

        {/* FIN DE CARD ORIGINAL */}

      </div>
      <Footer />
    </div>
  )
}

export default EditProduct;