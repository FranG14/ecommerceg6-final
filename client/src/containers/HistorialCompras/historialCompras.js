import React, { useEffect, useState } from "react"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from "../Footer/footer"
import {useDispatch,useSelector} from "react-redux"
import {getCartsUser} from "../../redux/actions/cart_actions"
import {Link} from "react-router-dom"
const { REACT_APP_API } = process.env;


function HistorialCompras(props){
    const [carritos,setCarritos]=useState([])
    const [idCarro,setIdCarro]=useState(0)
    const [idDeUsuario,setIdDeUsuario]=useState(props.match.params.userId)
    //const cartList = useSelector((state)=>state.cartReducer.cartsList)
    //useDispatch(getCartsUser(props.match.params.userId))
    async function touch(elemento){
        //alert(elemento)
        await setIdCarro(elemento)
        document.getElementById("redirectCarro").click()
    }

    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
      }

    useEffect(()=>{
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
        .then(res=>res.json())
        .then(res=>{
            let carts=[]
            for(let i=0;i<res.carts.length;i++){
                if(res.carts[i].state=="Paid"){
                    carts.push(res.carts[i])
                }
            }
            carts.sort((a,b)=>{
                if(parseDate(a.fechaCierre).getTime()>parseDate(b.fechaCierre).getTime()){
                    return 1;
                }
                if(parseDate(a.fechaCierre).getTime()<parseDate(b.fechaCierre).getTime()){
                    return -1;
                }
                return 0;
            })
            setCarritos(carts)
        })
    },[])
    return(
        <div>
            <Link to={`/detalle/${idCarro}/usuario/${idDeUsuario}`} id="redirectCarro"/>
            <UniversalNavBar/>
            <div className="flex h-screen w-100 pt-28 px-5">
                <div className="flex-grow">
                {
                    carritos.map(element=>{
                        return(
                            <div className="cursor-pointer" onClick={()=>{touch(element._id)}}>
                            <div className="flex justify-center py-4 hover:bg-gray-300">
                                <div className="flex flex-row w-5/6">
                                    <img src="https://img.icons8.com/cotton/64/000000/fast-cart.png" style={{width:"25px"}}/>
                                    <span className="text-lg font-bold  text-blue-500">{"Numero de orden: "+element._id}</span>
                                    <span className="flex-grow inline-block"></span>
                                    <span className="text-lg font-bold  text-blue-500">{element.fechaCierre}</span>
                                </div>
                            </div>
                            <div className="bg-gray-400" style={{height:"1px"}}></div>
                            </div>
                        );
                    })
                }
                
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default HistorialCompras