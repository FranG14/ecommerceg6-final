import React, { useEffect, useState } from 'react'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getActiveCartFromUser, getCartFromUser, getCartsByUser, incrementProductUnit, decrementProductUnit } from '../../redux/actions/cart_actions';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

const NewCart = () => {
    var { id } = useParams()
    const [payment, setPayment] = useState(0)
    // const user = useSelector(state =>
    //      state.userReducer)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartFromUser(user?.result?._id))
        totalItems()
    }, [id])

    const userCart = useSelector(
        (state) => (state.cartReducer.cart && state.cartReducer.cart && state.cartReducer.cart.cart && user) ? state.cartReducer.cart.cart.items : state.cartReducer
        // (state) => state.cartReducer
    );

    const totalQuantity = useSelector(
        (state) => (state.cartReducer.cart && state.cartReducer.cart.totalQuantity && user) ? state.cartReducer.cart.totalQuantity : 0

    );

    const totalAmount = useSelector(
        (state) => (state.cartReducer.cart && state.cartReducer.cart.cart && user) ? state.cartReducer.cart.cart.totalAmount : 0
    );


    const [total, setTotal] = useState({ totalItems: 0, totalPrice: 0 })

    const totalItems = () => {
        let totalItems = 0
        let totalPrice = 0
        for (var i = 0; i < userCart.length; i++) {
            // console.log(userCart[i].price)
            totalItems += userCart[i].quantity
            totalPrice += userCart[i].price
        }
        setTotal({ ...total, totalItems: totalItems, totalPrice: totalPrice })
        // console.log("asd",totalAmount)

    }
    const [itemQuantity, setitemQuantity] = useState(totalQuantity)
    const [totalPrice, setTotalprice] = useState(totalAmount)
    const deleteC = (userId, productId) => {
        dispatch(deleteItem(productId, userId))
        swal({
            title: "Product Removed From Cart",
            message: "Updating Cart",
            icon: "warning",
            button: true,
            dangerMode: true,
        }).then(function () {
            // window.location.reload()
        })
    }

    const increment = (user, cart) => {
        const productBody = { productId: cart?.productId };
        setitemQuantity(itemQuantity + 1)
        dispatch(incrementProductUnit(productBody.productId, user.result._id)); // {"productId": cart.productId} , user.result._id
        //Actualizar el numerito del medio acá
        totalItems()
        //Vean de ponerle un disable al boton de + si el número es igual al stock 
        //(Ahora traigo en el esquema de Cart el stock de cada producto)
    }
    const decrement = (user, cart) => {
        const productBody = { productId: cart?.productId };

        setitemQuantity(itemQuantity - 1)
        dispatch(decrementProductUnit(productBody.productId, user.result._id))  // {"productId": cart.productId} , user.result._id
        //Acá el disable iría si el número es igual a 1
        totalItems()
    }

    async function enviarDatos() {
        let usuario = JSON.parse(localStorage.getItem('profile'))
        if (usuario == null) {
            return document.getElementById("redirect").click();
        }
        console.log(usuario)

        document.getElementById("ch").setAttribute("disabled", true)

        fetch(`http://localhost:3001/mercadopago/${usuario?.result?._id}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                //alert(JSON.stringify(res))
                if (res.hasOwnProperty("message")) {
                    swal("error", "No tienes un carrito creado", "error")
                    document.getElementById("ch").removeAttribute("disabled")
                    return;
                }
                setPayment(res.id)
                document.getElementById("payment").click()
                //document.getElementById("ch").removeAttribute("disabled")
            })
            .catch(err => {
                swal("Error", "error", "error")
                document.getElementById("ch").removeAttribute("disabled")
            })
    }


    // console.log("CONSOLE DE USERcART", totalQuantity)
    return (
        <div class="bg-gray-200 h-full md:h-screen">
            <UniversalNavBar />
            <Link to={`/payment/${payment}`} id="payment" style={{ display: "none" }}></Link>
            <Link to="/auth" id="redirect" style={{ display: "none" }}></Link>
            <div class="grid grid-cols-12 mt-16 pt-4 gap-6">
                <div class="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
                    {userCart && userCart.length > 0 && userCart.map(cart => {
                        return (
                            <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                <div class="flex justify-between px-4 items-center">
                                    <div class="text-lg font-semibold">
                                        <p>{cart.name} {cart.colorName} {cart.sizeName}</p>
                                        <p class="text-gray-400 text-base">${cart.price}</p>
                                    </div>
                                    <div class="text-lg font-semibold ">
                                        <button onClick={() => deleteC(user.result._id, cart?.productId)} class="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                                            <svg xmlns="http://www.w3.org/2000/svg" class=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

                <div class="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- classic add --> */}
                        {userCart.length > 0 && userCart.map(cart => {
                            return (
                                <div class="flex justify-between border-b-2 mb-2">
                                    <div class="text-lg py-2">
                                        <p>{cart.name}</p>
                                    </div>
                                    <div class="text-lg py-2">
                                        <div class="flex flex-row space-x-2 w-full items-center rounded-lg">
                                            <button onClick={() => decrement(user, cart)} disabled={cart.quantity === 1} class="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                                                </svg>
                                            </button>
                                            <p> {cart.quantity} </p>
                                            <button onClick={() => increment(user, cart)} disabled={cart.quantity === cart.stock} class="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                        {/* <!-- End classic add -->
                        {/* <!-- Total Item --> */}
                        <div class="flex justify-center items-center text-center">
                            <div class="text-xl font-semibold">
                                <p>Total Item</p>
                                <p class="text-5xl">{totalQuantity}</p>
                            </div>
                        </div>
                        {/* <!-- End Total Item --> */}

                    </div>
                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- Total Price --> */}
                        <div class="flex justify-center items-center text-center">
                            <div class="text-xl font-semibold">
                                <p>Total Price</p>
                                <p class="text-5xl">${totalAmount}</p>
                            </div>
                        </div>
                        {/* <!-- End Total PRice --> */}
                    </div>
                    <div className="flex justify-center mb-2">
                        <button id="ch" className="bg-green-500 text-white rounded-md px-6 py-2" onClick={enviarDatos}>Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewCart