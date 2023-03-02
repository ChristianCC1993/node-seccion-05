import fs, { readFile, readFileSync } from 'fs'

const archivo = './db/data.json'


const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify(data) );      // JSON es un objeto que tiene JavaScript el cual tiene un metodo llamado stringify el cual convierte un objeto a su version JSON valida como un string

}

const leerDB = () => {

    if (!fs.existsSync(archivo) ) {
        return null;
    }

    const info = fs.readFileSync( archivo, 'utf8' );        // Retorna lo guardado en el .json como un string
    const data = JSON.parse( info );                        // Convierte lo cuardado del .json en un arreglo
    return data;
}

export { guardarDB, leerDB }