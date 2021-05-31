import axios from 'axios'
const api = 'http://apis.datos.gob.ar/georef/api'
//======================================================================//
export const getProvincias = () => async(dispatch) => {
    return await axios.get(`${api}/provincias`)
    .then((result) => result.data?.provincias)
    .then((provincias) => {
        console.log("PROVINCIAS", provincias)
        provincias.map(async(p) =>{return p.nombre})
        dispatch({
            type: 'GET_PROVINCIAS',
            payload: provincias.map((p) =>{return p.nombre})
        })
    })
}
//======================================================================//
export const getMunicipios = (provincia, input) => async(dispatch) => {
    return await axios.get(`http://apis.datos.gob.ar/georef/api/municipios?nombre=${input}&provincia=${provincia}&orden=nombre`)
    .then((result) => result.municipios ? result.municipios : [])
    .then((municipios) => {
        municipios.map((m)=> {return m.nombre})
    }).then((array)=> {
        console.log("Array de municipios", array)
        dispatch({
            type: 'GET_MUNICIPIOS',
            payload: array
        })
    })
} 
//======================================================================//
export const getCalle = (provincia, municipio, input) => async(dispatch) => {
    return await axios.get(`apis.datos.gob.ar/georef/api/calles?nombre=${input}&provincia=${provincia}&departamento=${municipio}&orden=nombre`)
    .then((result) => result.calles ? result.calles : [])
    .then((calles) => {
        calles.map((c) => {return c.nombre})
    }).then((array) => {
        dispatch({
            type: 'GET_CALLES',
            payload: array
        })
    }) 
}
//======================================================================//
