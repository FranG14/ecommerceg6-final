import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import remera from "./background_tshirt.png"
import "./tshirtFeature.css"
import batman from "./batman.png"
import { SwatchesPicker } from 'react-color';
import UniversalNavBar from '../UniversalNavBar/universalNavBar';
import Footer from '../../containers/Footer/footer';
import domtoimage from 'dom-to-image';


const TshirtFeature = () => {
    const [canvas, setCanvas] = useState('');
    const [imgURL, setImgURL] = useState('')

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 435,
            width: 360,
        })
    );

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);
    console.log(canvas)
    const addImg = (e, url, canvi) => {
        e.preventDefault();
        new fabric.Image.fromURL(url, img => {
            img.scale(0.75);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        }, {
            crossOrigin: "Annoymous"
        });;
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

    const download = () => {
        var node = document.getElementById('tshirt-div');

        domtoimage.toPng(node).then(function (dataUrl) {
            // Print the data URL of the picture in the Console
            console.log(dataUrl);
            // You can for example to test, add the image at the end of the document
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = dataUrl;

            //document.body.appendChild(img);
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.crossOrigin = 'Anonymous'
            link.href = dataUrl;
            link.click()
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
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


        // // 2. Cuando el usuario elige un diseño:
        // // Actualiza la imagen de fondo de la camiseta según la imagen seleccionada por el usuario
        // document.getElementById("tshirt-design").addEventListener("change", function () {

        //     // Llamar al método updateTshirtImage proporcionando como primer argumento la URL
        //     // de la imagen proporcionada por la selección
        //     updateTshirtImage(e);
        // }, false);
    }

    const clear = () => {
        canvas.clear()
    }



    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />

            <section class="mt-10 -mb-10 text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-24 mx-auto">
                    <div class=" mx-auto flex flex-wrap">
                        <div id='tshirt-div'>
                            {/* <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg" /> */}
                            <img id="tshirt-backgroundpicture" crossOrigin="anonymous" src={remera} />

                            <div id="drawingArea" class="drawing-area">
                                <div class="canvas-container">
                                    <canvas id="canvas"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-16 lg:mt-0">
                            <h2 class="text-lg title-font text-gray-500 tracking-widest">Design Your Own T-Shirt</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">Choose Shirt Color</h1>
                            <div id="tshirt-color" class="flex mb-4" className="colors">
                                <span class="flex items-center">
                                    <SwatchesPicker
                                        color={shirtColor}
                                        onChangeComplete={(a) => color(a.hex)}
                                    />
                                </span>
                            </div>
                            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

                                <div class="flex ml-6 items-center">
                                </div>
                            </div>
                            <div class="flex">
                                <form onSubmit={e => addImg(e, imgURL, canvas)}>
                                    <div className="">
                                        <h2 class="text-m title-font text-gray-500 tracking-widest">Image URL:</h2>
                                        <input className="border-2 rounded border-blue-600 w-80"
                                            type="text"
                                            value={imgURL}
                                            onChange={e => setImgURL(e.target.value)}
                                        />
                                        <div className="flex">
                                            <button type="submit" class="flex text-white bg-red-500 border-0 ml-10 mt-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" type="submit">Add Image</button>
                                            <button onClick={clear} class="flex text-white bg-red-500 border-0 ml-10 mt-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <button type="button" onClick={() => download()} class="flex text-white bg-red-500 border-0 ml-10 mt-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" type="submit">Add Image</button>

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
