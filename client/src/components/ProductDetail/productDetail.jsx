import React, { useEffect, useState } from 'react';
import { detailProduct } from '../../redux/actions/products_actions'
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addItem, addToCart, getCartFromUser } from '../../redux/actions/cart_actions'
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from '../../containers/Footer/footer';
import swal from 'sweetalert';
import carro from '../../assets/carro.png'
import StarRatingComponent from 'react-star-rating-component';
import { filterById } from '../../redux/actions/reviews_actions';


function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

function DetailProduct(props) {
    var { id } = useParams();
    //console.log("ENTRE")
    //console.log(id)
    const productsArray = useSelector(
        (state) => state.productsReducer.allProducts
    );
    const productsSize = useSelector(
        (state) => state.productsReducer.allProducts.size
    );
    const colorArray = useSelector(
        (state) => state.productsReducer.allProducts.color
    );
    const reviewsRating = useSelector(
        (state) => state.productsReducer.allProducts.productReview
    );
    // console.log("aaaaaaa", reviewsRating)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    //console.log("!!!!!!!,", reviewsRating)
    const dispatch = useDispatch()
    const [imagePos, setImagePos] = useState(0);
    const [average, setAverage] = useState(0)
    // console.log(productsSize)

    const changeImage = () => {
        if (imagePos < productsArray.img.length - 1) {
            setImagePos(imagePos + 1)
        }
        if (imagePos === productsArray.img.length - 1) setImagePos(0)
    }
    let reviewsFilter = reviewsRating
    if (reviewsRating && reviewsRating.length > 15) {
        reviewsFilter = reviewsRating.slice(-15)
        // console.log("AAaaa", reviewsFilter)
    }


    useEffect(() => {
        dispatch(detailProduct(id))
        /*   dispatch(filterById(id)) */
    }, [])

    // console.log(productsArray._id)
    const [addCart, setAddCart] = useState({
        productId: id,
        quantity: 1
    })

    function addProductToCart() {
        //alert(id)
        //fetch(`http://localhost:3001/carts/active/${JSON.parse(localStorage.getItem('profile')).result._id}`)
        //props.addToCart({id:id,img:productsArray.img,brand:productsArray.brand,name:productsArray.name,stock:productsArray.stock,price:productsArray.price})
        //Germán: Cambié esto para poder agregar al carrito cuando no está logueado
        dispatch(getCartFromUser(user?._id || undefined))
        swal({
            title: "Your Product Was Added to Cart!",
            icon: carro,
            button: true,
            dangerMode: true,
        })
        dispatch(addItem(addCart, user?.result._id || undefined))


    }
    const averageRating = () => {
        let sum = 0
        if (reviewsFilter && reviewsFilter.length > 0) {
            for (var i = 0; i < reviewsFilter.length; i++) {
                sum = sum + reviewsFilter[i].rating
            }
            sum = sum / reviewsFilter.length
            setAverage(sum)
            console.log("aAAAAAAA", reviewsFilter)
            console.log("promedio", average)
        }
    }
    useEffect(() => {
        averageRating()

    })

    // console.log("+++++", average)
    return (
        <div>
            <UniversalNavBar />
            <section class="text-gray-700 body-font overflow-hidden mt-10 bg-gray-200">
                <div class="container px-5  py-28 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap bg-gray-100 pr-5 rounded sm:w-auto">
                        {productsArray.img && productsArray.img.length > 0 &&
                            <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center pl-5 py-5 rounded border " onClick={changeImage} src={`http://localhost:3001/products/image/${productsArray.img[imagePos]}`} />}
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-2xl pl-4 title-font text-gray-500 tracking-widest">{productsArray.brand}</h2>
                            <h1 class="text-gray-900 pl-4 text-3xl title-font font-medium mb-1">{productsArray.name}</h1>
                            <h2 class="text-l title-font pl-4 text-gray-500 tracking-widest">{productsArray.stock === 0 ? <h2 className="text-red-500">No Stock</h2> : (productsArray.stock < 10) ? <h2>There is only {productsArray.stock} left</h2> : <h2>In Stock.</h2>}</h2>
                            <div class="flex mb-4 pl-3">
                                <span class="flex items-center">
                                    {productsArray.productReview && productsArray.productReview.length === 0 ? <h2>No reviews</h2> :
                                        <StarRatingComponent
                                            name="rate2"
                                            editing={false}
                                            renderStarIcon={() => <span className="text-xl">★</span>}
                                            starCount={5}
                                            value={average}
                                        />
                                    }
                                    {productsArray.productReview && productsArray.productReview.length === 0 ? '' : <Link to={"/reviews/" + productsArray._id}><span class="text-gray-600 ml-3 text-lg">Reviews</span></Link>}
                                </span>
                                <span class="flex ml-3 pl-3 -mr-3 py-2 border-l-2 border-gray-200"></span>
                                <Link to={"/reviews/add/" + productsArray._id}><span class="text-gray-600 ml-3 text-lg">Add Review</span></Link>
                            </div>
                            <p class="leading-relaxed pl-4">{productsArray.description}</p>
                            <div class="flex mt-6 pl-4 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div class="flex items-center">
                                    <span class="mr-3">Color</span>
                                    <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                        {colorArray && colorArray.length > 0
                                            ? colorArray.map((c, id) => {
                                                return (
                                                    <option key={id} value={c}>
                                                        {c}
                                                    </option>
                                                );
                                            })
                                            : ""}

                                    </select>
                                </div>
                                <div class="flex ml-6 items-center">
                                    <span class="mr-3">Size</span>
                                    <div class="relative">
                                        <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                            {productsSize && productsSize.length > 0
                                                ? productsSize.map((c, id) => {
                                                    return (
                                                        <option key={id} value={c}>
                                                            {c}
                                                        </option>
                                                    );
                                                })
                                                : ""}

                                        </select>
                                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex mb-4 pl-4">
                                <span class="title-font font-medium text-2xl mt-1 text-gray-900">${productsArray.price}</span>
                                {
                                    (productsArray.stock >= 1) ?
                                        <button class="flex ml-4 text-white bg-red-500 border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded" onClick={addProductToCart}>Add to Cart</button>
                                        : ""
                                }
                                {
                                    (productsArray.stock >= 1) ?
                                        <button class="flex ml-4 text-white bg-red-500 border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded">Buy</button>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default connect(mapStateToProps, { addToCart })(DetailProduct);
