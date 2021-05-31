import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UniversalBar from '../UniversalNavBar/universalNavBar';
import Footer from '../../containers/Footer/footer';
import { useHistory, useParams } from 'react-router-dom';
import { getUserById, addAddress } from '../../redux/actions/user_actions'
import {getProvincias, getMunicipios, getCalles} from '../../redux/actions/addresses_actions'
import swal from "sweetalert";

const newUser = {
    streetNumber: "",
    street: "",
    state: "",
    country: "",
    zipcode: "",
};

export default function AddAddressForm() {
    var { id } = useParams();

    const [user, setUser] = useState(newUser)

    const history = useHistory();

    const userArray = useSelector(
        (state) => state
    );

    const addressState = useSelector(
        (state) => (state.addressReducer) && state.addressReducer 
    );

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserById(id))
        dispatch(getProvincias())
    }, [id, dispatch])

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAddress(id, user, history, swal));
    };

    return (
        <div>
            <UniversalBar />
            <div class="grid min-h-screen place-items-center mt-20">
                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 mt-4
            bg-white rounded-lg shadow-md lg:shadow-lg">

                    <h1 class="text-xl font-semibold">Add An Address</h1>
                    <form class="mt-6" onSubmit={handleSubmit}>
                        <h1 class="text-xl font-semibold mt-2">Address</h1>

                        <select 
                        name ="state" 
                        id="state" 
                        value={user.state} 
                        onChange={handleInputChange}
                        >
                            {
                                (addressState?.provincias) && addressState.provincias.map((p) => 
                                    <option value={p}>{p}</option>
                                )
                            }
                        </select>



                        <input
                            value={user.streetNumber}
                            id="streetNumber"
                            onChange={handleInputChange}
                            type="number"
                            name="streetNumber"
                            placeholder="Street Number"
                            className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />

                        <input
                            value={user.street}
                            onChange={handleInputChange}
                            id="street"
                            type="text"
                            name="street"
                            placeholder="Street Name"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <input
                            value={user.state}
                            onChange={handleInputChange}
                            id="state"
                            type="text"
                            name="state"
                            placeholder="State"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        /> 
                        <input
                            value={user.country}
                            onChange={handleInputChange}
                            id="country"
                            type="text"
                            name="country"
                            placeholder="Country"
                            autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <input
                            value={user.zipcode}
                            onChange={handleInputChange}
                            id="zipcode"
                            type="number"
                            name="zipcode"
                            placeholder="zipcode"
                            autocomplete="current-password"
                            className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                            />
                            <button type="submit" className="w-full py-3 mt-5 bg-green-700 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-green-600 hover:shadow-none">
                                Add
                            </button>

                        </form>
                    </div>
                </div>
            <Footer />
        </div>
    )
}
