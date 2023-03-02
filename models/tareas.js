import { Tarea } from "./tarea.js";




class Tareas{

    _listado = {};

    get listadoArr() {                               // para convertir el objeto en un arreglo

        const listado = [];                          // Se declara el arreglo

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id2 = '') {
        this.listadoArr.forEach( ( tarea, i ) => {
            const { id } = tarea;              // guardo el id de cada uno de los objetos de la lista en cada iteracion aqui 
            if ( id2 == id ) {                 // comparo los id a ver si hay alguna coincidencia
                delete this._listado[i];       // de existir borra el objeto de la lista usando el indice ya que no buscaba por id   
            }
        })
    }
    

    cargarTareasFromArray ( tareas = [] ) {

        this._listado = tareas;
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto( tareas=[] ) {

        tareas.forEach( ({ desc, completadoEn}, i) => {     // forEach tiene por segundo argumento el indice, en este caso usamos i como indice
            
            (completadoEn) 
                ? completadoEn = `completado`.green
                : completadoEn = `Pendiente`.red;
            const idx = ` ${i +1} `.green;
            console.log(` ${ idx } . ${ desc } :: ${ completadoEn } `)

        })

        /*      Alternativa ::
        this.listadoArr.forEach( (tarea,id) => {
            const idx = ` ${i +1} `.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) 
                               /? completadoEn = `Pendiente`.red
                                : completadoEn = `completado`.green;
            console.log(` ${ idx } . ${ desc } :: ${ estado } `)
        })
        */
        
    }

    listarPendientesCompletadas( completadas = true ) {
        let idx = 0;
        this.listadoArr.forEach( ( tarea ) => {

            const { completadoEn, desc } = tarea;
            switch( completadas ) {
                case true:
                    if ( completadoEn !== null ){
                        idx += 1;
                        console.log(` ${ (idx.toString() +'.').green } ${ desc } :: ${ completadoEn.green } `)
                    }
                break;

                case false:
                    if ( completadoEn == null ){
                        idx += 1;
                        console.log(` ${ (idx.toString() +'.').green } ${ desc } :: ${ 'Pendiente'.red } `)
                    }
                break;
            }            
        })

    }

    toggleCompletadas( ids = [] ) {
        
        this._listado.forEach( ( tarea ) => {
            tarea.completadoEn = ids.includes( tarea.id )
                ? new Date().toISOString()
                : null;

        })

    }

}

export { Tareas }