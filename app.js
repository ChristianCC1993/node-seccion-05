import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

//const { mostrarMenu, pausa } = require('./helpers/mensajes');
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasConfirmar } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';


const main = async() => {

    console.clear();
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        
        tareas.cargarTareasFromArray( tareasDB );
        
    }

    do {
        // opt = await mostrarMenu();           // <= Usando mensajes.js
        opt = await inquirerMenu();             // <= Usando inquirer.js    // imprime el menú

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );

            break;

            case '2':
                //console.log( tareas.listadoArr );           // devuelve la lista como un arreglo
                // console.log( tareas._listado );             // Devuelve la lista como objetos independientes
                tareas.listadoCompleto( tareas.listadoArr );
            break;

            case '3':
                tareas.listarPendientesCompletadas( true );
            break;

            case '4':
                tareas.listarPendientesCompletadas( false );
            break;

            case '5':
                const ids = await listadoTareasConfirmar(tareas.listadoArr);
                console.log( ids );
                tareas.toggleCompletadas( ids );
            break;

            case '6':   // Borrar
                const id =  await listadoTareasBorrar( tareas.listadoArr );
                if (id !=='0'){
                    const confirmacion = await confirmar('¿Está seguro?');
                    if ( confirmacion ) {
                        tareas.borrarTarea( id );
                        console.log( 'Tarea borrada' );
                    }
                }
            break;
        }
        
        guardarDB( tareas.listadoArr );

        await pausa();       // <= Usando mensajes.js
      

    } while( {opt} !== '0')
    
    //pausa();
}


main();