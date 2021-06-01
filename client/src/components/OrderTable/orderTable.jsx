import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
// import { deleteOrder, getOrder, searchOrder } from "../../redux/actions/orders_actions";
import { changeCartState, getAllCarts } from "../../redux/actions/cart_actions";

const OrdersTable = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    useEffect(() => {
        dispatch(getAllCarts("", page));
    }, [page]);

    const orderArray = useSelector(
        (state) => state.cartReducer.cart.carts
    );

    const [filter, setFilter] = useState("Paid")

    const next = () => {
        setPage(page + 1)

    }
    const prev = () => {
        setPage(page - 1)
    }
    console.log("!!!!!!!!!", orderArray);

    const [selectedState, setSelectedState] = useState("")
    const handleSelect = () => {
        let select = document.getElementById("status")
        if (select) {
            let selectValue = select.options[select.selectedIndex].innerText
            setSelectedState(selectValue)
        }
    }
    console.log(selectedState)

    const changeState = (state, userId) => {
        dispatch(changeCartState(state, userId))
        //window.location.reload()
    }

    const deleteC = (payload) => {
        //dispatch(deleteOrder(payload))
        swal({
            title: "Deleted product",
            icon: "warning",
            buttons: false,
            dangerMode: true,
        })
        window.location.reload()
    }

    const reset = () => {
        setFilter("");
        dispatch(getAllCarts(""))
    }

    const selectedFilter = (filter) => {
        dispatch(getAllCarts(filter))
    }
    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <div className="mt-16 pt-4 mb-4 flex justify-center">

                <div class="relative mr-6 pt-8 my-2 ml-2">
                    {/* Filtros */}
                    <select className ="h-11 rounded" id ="selectOptions" onChange = {(e) => setFilter(e.target.value)}>
                    <option>Filter by</option>
                        <option>Paid</option>
                        <option>Cancelled</option>
                        <option>On it´s way</option>
                        <option>Delivered</option>
                        <option>Active</option>
                    </select>
                    <button className="inline-block px-6 ml-4 h-11 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none" onClick={() => selectedFilter(filter)}>Filter</button>
                    {filter && <p onClick={reset} className="px-2 py-1 inline-block mr-2 mt-4 ml-4 cursor-pointer rounded round border-4 border-red-400 mb-2 w-auto text-center">{filter} X</p>}
                </div>

            </div >

            <table class="border-collapse w-full">
                <thead>
                    <tr>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Date of Order</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">User</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Quantity</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Order Status</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderArray && orderArray.length > 0 ? orderArray.map((c, id) => {
                        return <tr key={id} class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {c.fechaCierre && c.fechaCierre.split(".")[0].split("T")[0] + " / " + c.fechaCierre.split(".")[0].split("T")[1]}
                            </td>
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {c.userId && c.userId.username ? c.userId.username : "User Not Logged"}
                            </td>
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {c.items && c.items.length > 0 ? c.items.map((a, id) => {
                                    return <h1> {a.quantity}</h1>
                                }) : <h1>No Products</h1>}
                            </td>

                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                ${c.totalAmount}
                            </td>
                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.state}
                            </td>

                            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <button title="Detalle Orden" class="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"> <Link to={'/orders/state/' + c._id}>✍</Link> </button>
                                <button title="Eliminar Orden" class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => deleteC(c._id)}> 🗑 </button>
                            </td>
                        </tr>
                    }) : ""}



                </tbody>
            </table>
            <br></br>
            <div class="flex justify-center mb-4">
                <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
                    <svg class="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
                    </svg>
                                     Previous page
                             </button>
                <button onClick={next} disabled={orderArray && orderArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
                    Next page
                            <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
                    </svg>
                </button>
            </div>
            <Footer />
        </div >
    )
}

export default OrdersTable
