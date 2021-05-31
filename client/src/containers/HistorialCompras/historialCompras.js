import React, { useEffect, useState } from "react"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from "../Footer/footer"
import { useDispatch, useSelector } from "react-redux"
import { getCartsUser } from "../../redux/actions/cart_actions"
import { Link } from "react-router-dom"
const { REACT_APP_API } = process.env;


function HistorialCompras(props) {
    const [carritos, setCarritos] = useState([])
    const [idCarro, setIdCarro] = useState(0)
    const [idDeUsuario, setIdDeUsuario] = useState(props.match.params.userId)
    //const cartList = useSelector((state)=>state.cartReducer.cartsList)
    //useDispatch(getCartsUser(props.match.params.userId))
    async function touch(elemento) {
        //alert(elemento)
        await setIdCarro(elemento)
        document.getElementById("redirectCarro").click()
    }

    function parseDate(input) {
        console.log("ENTRA AL PARSE INT", input)
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }

    useEffect(() => {
        /*
        for(let i=0;i<cartList.carts.length;i++){
            if(cartList.carts[i].state=="completed"){
                carts.push(cartList.carts[i])
            }
        }
        let carts=[]
        carts.sort((a,b)=>{
            if(a.fechaCierre.getTime()>b.fechaCierre.getTime()){
                return 1;
            }
            if(a.fechaCierre.getTime()<b.fechaCierre.getTime()){
                return -1;
            }
            return 0;
        })
        setCarritos(carts)*/

        fetch(`${REACT_APP_API}carts/${props.match.params.userId}`)
            .then(res => res.json())
            .then(res => {
                let carts = []
                for (let i = 0; i < res.carts.length; i++) {
                    if (res.carts[i].state == "Paid") {
                        carts.push(res.carts[i])
                    }
                    if (res.carts[i].state == "On it's Way") {
                        carts.push(res.carts[i])
                    }
                    if (res.carts[i].state == "Delivered") {
                        carts.push(res.carts[i])
                    }
                }
                carts.sort((a, b) => {
                    if (parseDate(a.fechaCierre).getTime() > parseDate(b.fechaCierre).getTime()) {
                        return 1;
                    }
                    if (parseDate(a.fechaCierre).getTime() < parseDate(b.fechaCierre).getTime()) {
                        return -1;
                    }
                    return 0;
                })
                setCarritos(carts)
            })
    }, [])
    console.log("CCC",carritos)
    return (
        <div>
            <UniversalNavBar />
            <div className="flex h-screen w-100 pt-28 px-5">
                <div className="flex-grow">
                    <table class=" border-collapse w-full">
                        <thead>
                            <tr>
                                <th class="mt-16  p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Date of Order</th>
                            <th class="mt-16  p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product</th>
                                <th class="mt-16  p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total</th>
                                <th class="mt-16  p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">State</th>
                            </tr>
                        </thead>
                        <tbody>
                         {            
                                carritos.map((prop, id) => {
                                    return <tr key={id} class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                        <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                            {prop.fechaCierre.split(".")[0].split("T")[0] + " / " + prop.fechaCierre.split(".")[0].split("T")[1]}
                                        </td>
                                        <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        {prop.items.length > 0 && prop.items.map(p => {
                                            return <p ><Link className = "hover:text-blue-500" to ={`/product/${p.productId}`}>{p.name} {p.colorName} {p.sizeName}</Link></p>
                                        })}
                                        </td>
                                        <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                        {prop.totalAmount}
                                        </td>
                                        
                                        <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                        {prop.state}
                                        </td>
                                    </tr>
                                })
                           }
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default HistorialCompras