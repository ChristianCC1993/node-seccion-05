require('colors');


const mostrarMenu = () => {

    return new Promise( resolve => {        // Se crea el return de esta manera y no con async en la función
                                            // ya que sino el return pertenece al readline y tira error XD

        console.clear();
        console.log(' ===================== '.green);
        console.log(' Seleccione una opción '.green);
        console.log(' ===================== '.green);
    
        console.log(` ${ '1'.green }. Crear tarea`);
        console.log(` ${ '2'.green }. Listar tareas`);
        console.log(` ${ '3'.green }. Listar tareas completadas`);
        console.log(` ${ '4'.green }. Listar tareas pendientes`);
        console.log(` ${ '5'.green }. completar tarea(s)`);
        console.log(` ${ '6'.green }. Borrar tarea`);
        console.log(` ${ '0'.green }. Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(' Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });

}

const pausa = () => {
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\n Presione ${'ENTER:'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    })

}

module.exports = {
    mostrarMenu,
    pausa
}