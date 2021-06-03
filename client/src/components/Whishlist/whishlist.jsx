import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getOrCreateWhishlistFromUser,
  removeProductFromWhishlist,
} from "../../redux/actions/whishlist_action";
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";

const Whishlist = () => {
  var { id } = useParams();
  
  const dispatch = useDispatch();
  const history = useHistory();

  const whishlistData = useSelector(
    (state) => state.whishlistReducer?.whishlist?.whishlist?.products
  );

    useEffect(() => {
        dispatch(getOrCreateWhishlistFromUser(id));
        console.log(whishlistData)

    }, [id, dispatch]);


    const handleClose = (id, productId, swal, history) => {
        dispatch(removeProductFromWhishlist(id, productId, swal, history));
    };

    return (
            <div>
                <div className="bg-gray-200 tracking-wide font-bold">
                    <div className="pb-10 bg-gray-200">
                        <UniversalNavBar />
                    </div>
                </div> 
                <div>
                {whishlistData?.lenght > 0 ? (
                whishlistData.map((w, index) => (
                <Link to={`/product/${w.productId}`}>
                    <div
                    key={index}
                    class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4"
                    >
                        <div class="flex justify-between px-4 items-center">
                            <div class="text-lg font-semibold">
                                <p>{w.name}</p>
                                <p class="text-gray-400 text-base">${w.price}</p>
                            </div>
                            <div class="text-lg font-semibold transform rotate-45 ">
                                <button
                                onClick={() => handleClose(id, w.productId)}
                                class="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center "
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class=" h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))
                ) : (
                <p><br/><br/><br/><br/><br/>There are no products in your whishlist</p>
                )}
            </div>
            <div className="pt-10 bg-gray-200">
                <Footer />
            </div>
        </div>
    );
};
export default Whishlist;
