import React from "react"
import Footer from "../Footer/footer"
import ImagenAbout from "../../assets/aboutus.png"
import ImagenJuanIgnacio from "../../assets/Juan.jpg"
import ImagenJuli from "../../assets/Juli.jpeg"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"

export default function About() {
    function redirigir(direccion) {
        window.location.href = direccion;
        return;
    }
    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <div className="flex justify-center pt-20">
                <div className="flex flex-col">
                    <div className="flex justify-center my-10">
                        <div className="flex flex-col justify-center align-center content-center">
                            <div className="flex justify-center">
                                <img className="w-80" src={ImagenAbout} />
                            </div>
                            <p className="px-20 py-10 text-justify">We are constantly striving to improve our business by introducing new products, improving our staff and constantly expanding our range. Our main target market is the Australian consumer, but we constantly source overseas customers as well. Our vision is to become a global fashion brand that will appeal to every fashion lover around the world. </p>
                        </div>
                    </div>
                    <div className="flex justify-center mx-20">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://i.pinimg.com/736x/11/37/ee/1137ee964d8dcd7048f62001fe6434cc.jpg" alt="not found" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Diego: Martin Luther King tenía un sueño de que se terminara el racismo, el mío es que le digan palta al aguacate en toda latinoamerica</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/Diego121520")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src={ImagenJuli} />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Me gustan los gatitos, Javascript y la cerveza, te invito a ver mi github!</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/julianactrl")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://avatars.githubusercontent.com/u/56849875?v=4" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">German Chrystan: Soy desarrollador web y músico, terminando la carrera de Composición en la Universidad Nacional de las Artes. He trabajado mayormente como docente de música, compositor para obras de teatro, productor musical y gestionando la agenda cultural del Multiespacio María Fux. Empecé a estudiar programación con el fin de relacionarlo con el sonido y la composición. Con la llegada de la nueva normalidad, este interés se transformó en una profesión que me apasiona y me motiva continuamente.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/Germanchrystan")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://i.pinimg.com/originals/a1/f1/7a/a1f17a5e38cb4b173203fa3b58aa8f1c.jpg" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Francisco : La pizza de anana debería ser ilegal</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/FranG14")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://cdn.generadormemes.com/media/templates/xgato_enojado33.jpg.pagespeed.ic.plantilla-memes.jpg" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Juan Agustin : Aprendí mas con este trabajo práctico que en toda la cursada de Henry</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/AgustinReynaud")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src={ImagenJuanIgnacio} />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Mi carrera anterior fue en comercio minorista, ingreso de datos, reparación y ensamblaje de computadoras, redes de computadoras y cámaras de seguridad. Recientemente he vuelto a capacitarme como desarrollador web de pila completa en
                            JavaScript,
                            CSS,
                            HTML
                            NodeJs,
                            React,
                            Redux,
                            SQL

                            Estoy buscando un trabajo de desarrollador de nivel de entrada donde pueda aprender y usar mis nuevas habilidades en un entorno práctico, he realizado varios proyectos durante mi capacitación utilizando Visual Studio Code, Postman y lenguajes de codificación, estoy comprometido a producir sitios web con un gran experiencia del usuario y que están optimizados para SEO para tener un alto rango en los resultados de búsqueda de Google.

                                Para ver más detalles, por favor, busque en mi github.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/Pitelbarbia")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQ0gUFiWvt2SqU6kufMvSTPOYgYHS3ua0oivfLbJ1UCMcc9xZNqBWpD4TZW8AZc340Ug&usqp=CAU" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Jonathan : Me gusta el helado de chocolate bañado en chocolate en un conito de chocolate</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/nohaynicksdisponibles")}>Github</button>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}