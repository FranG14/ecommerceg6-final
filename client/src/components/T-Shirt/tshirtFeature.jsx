import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import remera from "./background_tshirt.png"
import "./tshirtFeature.css"
import batman from "./batman.png"
import { SwatchesPicker } from 'react-color';
import UniversalNavBar from '../UniversalNavBar/universalNavBar';
import Footer from '../../containers/Footer/footer';


const TshirtFeature = () => {
    const [canvas, setCanvas] = useState('');
    const [imgURL, setImgURL] = useState('')

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 365,
            width: 170,
        })
    );

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);

    const addImg = (e, url, canvi) => {
        e.preventDefault();
        new fabric.Image.fromURL(url, img => {
            img.scale(0.75);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        });
    }

    const addRect = canvi => {
        const rect = new fabric.Rect({
            height: 50,
            width: 50,
            fill: 'yellow'
        });
        canvi.add(rect);
        canvi.renderAll();
    }

    /**
 * Método que define una imagen como imagen de fondo del lienzo.
 * 
 * @param {String} imageUrl      La URL del servidor de la imagen que desea cargar en la camiseta.
 *
 * @return {void} Descripción del valor de retorno.
 */
    function updateTshirtImage(imageURL) {
        // Si el usuario no elige una opción de la selección, borre el lienzo
        if (!imageURL) {
            canvas.clear();
        }

        // Cree una nueva imagen que se pueda usar en Fabric con la URL
        fabric.Image.fromURL(imageURL, function (img) {
            // Definir la imagen como imagen de fondo del lienzo
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                // Escala la imagen al tamaño del lienzo
                height: 100,
                width: 50,
            });
        });
    }

    const [shirtColor, setShirtColor] = useState()

    const handleChangeComplete = (e) => {
        setShirtColor(e.hex);

    };

    const color = (e) => {
        // 1. Cuando cambia el color de la camiseta:
        // Actualiza el color de la camiseta según el color seleccionado por el usuario

        document.getElementById("tshirt-div").style.backgroundColor = e;


        // 2. Cuando el usuario elige un diseño:
        // Actualiza la imagen de fondo de la camiseta según la imagen seleccionada por el usuario
        document.getElementById("tshirt-design").addEventListener("change", function () {

            // Llamar al método updateTshirtImage proporcionando como primer argumento la URL
            // de la imagen proporcionada por la selección
            updateTshirtImage(e);
        }, false);
    }

    const clear = () => {
        canvas.clear()
    }



    return (
        <div>
            <UniversalNavBar />

            <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <div id='tshirt-div'>
                            {/* <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg" /> */}
                            <img id="tshirt-backgroundpicture" src={remera} />

                            <div id="drawingArea" class="drawing-area">
                                <div class="canvas-container">
                                    <canvas id="canvas"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
                            <div id="tshirt-color" class="flex mb-4">
                                <span class="flex items-center">
                                    <SwatchesPicker
                                        color={shirtColor}
                                        onChangeComplete={(a) => color(a.hex)}
                                    />
                                </span>
                            </div>
                            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div class="flex">
                                    <span class="mr-3">Color</span>
                                    <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div class="flex ml-6 items-center">
                                    <span class="mr-3">Size</span>
                                    <div class="relative">
                                        <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
                                <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Button</button>
                                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default TshirtFeature
