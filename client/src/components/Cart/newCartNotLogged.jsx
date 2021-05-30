import React, { useState } from 'react'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { decrementProductUnitNotLogged, getCartNotLogged, incrementProductUnitNotLogged } from '../../redux/actions/cart_actions';
import swal from 'sweetalert';

const NewCartNotLogged = () => {
    const userCart = getCartNotLogged()
    const [total, setTotal] = useState({ totalItems: 0, totalPrice: 0 })

    const totalItems = () => {
        let totalItems = 0
        let totalPrice = 0
        for (var i = 0; i < userCart.length; i++) {
            totalItems = totalItems + userCart[i].quantity
            totalPrice = totalPrice + userCart[i].price
        }
        setTotal({ ...total, totalItems: totalItems, totalPrice: totalPrice })
    }

    const increment = (id) => {
        incrementProductUnitNotLogged(id)
        console.log("MAS")
    }
    const decrement = (id) => {
        decrementProductUnitNotLogged(id)
        console.log("MENOS")
    }

    return (
        <div className="bg-gray-200 h-full md:h-screen">
            <UniversalNavBar />
            <div className="grid grid-cols-12 mt-16 pt-4 gap-6">
                <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
                    {userCart?.items && userCart?.items.length > 0 && userCart.items.map(cart => {
                        return (
                            <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                <div className="flex justify-between px-4 items-center">
                                    <div className="text-lg font-semibold">
                                        <p>{cart.productName} {cart.colorName} {cart.sizeName}</p>
                                        <p className="text-gray-400 text-base">${cart.price}</p>
                                    </div>
                                    <div className="text-lg font-semibold transform rotate-45 ">
                                        <button className="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- classic add --> */}
                        {userCart?.items.length > 0 && userCart.items.map(cart => {
                            return (
                                <div className="flex justify-between border-b-2 mb-2">
                                    <div className="text-lg py-2">
                                        <p>{cart.productName} {cart.colorName} {cart.sizeName}</p>
                                    </div>
                                    <div className="text-lg py-2">
                                        <div className="flex flex-row space-x-2 w-full items-center rounded-lg">
                                            <button onClick={() => decrement(cart.productId)} disabled={cart.quantity === 1} className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                                                </svg>
                                            </button>
                                            <p> {cart.quantity} </p>
                                            <button onClick={() => increment(cart.productId)} disabled={cart.quantity === cart.stock} className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <div className="flex justify-center items-center text-center">
                            <div className="text-xl font-semibold">
                                <p>Total Item</p>
                                <p className="text-5xl">{total.totalItems}</p>
                            </div>
                        </div>
                        {/* <!-- End Total Item --> */}

                    </div>
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- Total Price --> */}
                        <div className="flex justify-center items-center text-center">
                            <div className="text-xl font-semibold">
                                <p>Total Price</p>
                                <p className="text-5xl">${total.totalPrice}</p>
                            </div>
                        </div>
                        {/* <!-- End Total PRice --> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewCartNotLogged