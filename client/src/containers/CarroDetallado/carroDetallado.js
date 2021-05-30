import React, { useEffect, useState } from "react"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from "../Footer/footer"
import { connect } from "react-redux"
const { REACT_APP_API } = process.env;


function mapStateToProps(state) {
    return { carritos: state.cartReducer.cartsList }
}


function CarroDetallado(props) {
    const [carrito, setCarrito] = useState({})

    useEffect(async () => {

        //await props.getCartsUser(props.match.params.userId)

        //props.carritos.carts.filter(element=>element._id==props.match.params.idCarro).map(arr=>setCarrito(arr[0]))

        fetch(`${REACT_APP_API}carts/${props.match.params.userId}`)
            .then(res => res.json())
            .then(res => {
                let bandera = 0;
                for (let i = 0; i < res.carts.length; i++) {
                    if (res.carts[i]._id == props.match.params.idCarro) {
                        bandera = i;
                        break;
                    }
                }
                setCarrito(res.carts[bandera])
            })
            
    }, [])
    console.log("PEPEPEPEPE",carrito)
    return (
        <div className="bg-gray-200">
            <div className="pb-10 bg-gray-200">
                <UniversalNavBar />
            </div>
            {
                <div className="bg-gray-200 pt-20 pb-10">
                    <div className="max-w-4xl flex items-center mt-4 mb-4 bg-gray-200 flex-wrap mx-auto lg:my-0">

                        {/* <!--Main Col--> */}
                        <div id="profile" className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">

                            <div className="p-4 md:p-12  text-center lg:text-left">
                                {/* <!-- Image for mobile view--> */}
                                {/* <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div> */}

                                <h1 className="text-3xl font-bold pt-8 lg:pt-0"> Product Detail</h1>
                                <div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className=" text-base font-bold  lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Product Name: {(carrito.items)?carrito.items[0].name:""} {(carrito.items)?carrito.items[0].colorName:""} {(carrito.items)?carrito.items[0].sizeName:""}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Quantity: {(carrito && carrito.items)?carrito.items[0].quantity:""}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📧 Unit Price: $ {(carrito && carrito.items)? carrito.items[0].price:""}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📌 Total: {(carrito )? carrito.totalAmount:""} </p>
                                <p className=" text-base font-bold  lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📍 date of order: {(carrito.fechaCierre)?carrito.fechaCierre.split(".")[0].split("T")[0] + " / " + carrito.fechaCierre.split(".")[0].split("T")[1]:""}</p>

                                <div className="grid grid-cols-2 grid-row-2 pt-12 pb-8   text-center content-between">
                                </div>
                            </div>
                        </div>
                        {/* <!-- Pin to top right corner --> */}
                    </div>
                </div>
            }
            <div className="pt-10 bg-gray-200">
                <Footer />
            </div>
        </div>
    );
}

export default CarroDetallado

//export default connect(mapStateToProps,{getCartsUser})(CarroDetallado)
/*

carrito.items.map(element=>{
                            return(
                                <div className="flex w-full justify-around">
                                    <span>{element.name}</span>
                                    <span>{element.quantity}</span>
                                    <span>{element.price}</span>
                                </div>
                            );
                        })


*/
/*





                <div className="flex flex-col h-screen">
                    <div className="flex w-full justify-around mt-6">
                        <span className="text-3xl font-bold text-blue-500">Producto</span>
                        <span className="text-3xl font-bold text-blue-500">Cantidad</span>
                        <span className="text-3xl font-bold text-blue-500">Precio Unitario</span>
                    </div>
                    {
                        carrito.hasOwnProperty("items")?
                        carrito.items.map(element=>{
                         return(
                            <div className="flex w-full justify-around my-2">
                                <span className="text-3xl font-bold text-blue-500">{element.name}</span>
                                <span className="text-3xl font-bold text-blue-500">{element.quantity}</span>
                                <span className="text-3xl font-bold text-blue-500">{element.price}</span>
                            </div>
                             );
                         }):
                      <div></div>
                    }
                    <div className="w-full h-full"></div>
                    <div className="bg-gray-300" style={{height:"1px"}}></div>
                    {
                        carrito.hasOwnProperty("items")?
                        <div className="flex w-full justify-around mb-6">
                                <span className="text-3xl font-bold text-blue-500">TOTAL</span>

                                <span className="text-3xl font-bold text-blue-500">{carrito.totalAmount}</span>
                        </div>:
                      <div></div>
                    }
                </div>




*/