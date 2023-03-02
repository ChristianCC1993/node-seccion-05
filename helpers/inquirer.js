// Aqui se encuentran almacenadas todas las funciones referentes al menú
import inquirer from 'inquirer';
import read from 'readline';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            { value: '1', name: `${'1'.green}. Crear tarea`  },
            { value: '2', name: `${'2'.green}. Listar tarea` },
            { value: '3', name: `${'3'.green}. Listar tarea completadas` },
            { value: '4', name: `${'4'.green}. Listar tarea pendientes` },
            { value: '5', name: `${'5'.green}. Completar tarea(s)` },
            { value: '6', name: `${'6'.green}. Borrar tarea` },
            { value: '0', name: `${'0'.green}. Salir` },
         ]
    }
];

const inquirerMenu = async() => {
    
    //console.clear();
    console.log(' ===================== '.green);
    console.log(' Seleccione una opción '.green);
    console.log(' ===================== '.green);

    const { opcion } = await inquirer.prompt( preguntas );
    return opcion;
}

/*
const pausa = () => {
    return new Promise( resolve => {

        const readline = read.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\n Presione ${'ENTER:'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    })

}
*/

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`,
        }
    ];

    await inquirer.prompt(question);

}

const leerInput = async( message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){                              // Para validar que el leerInput contenga un mensaje
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async( tareas = []) => {

    // { value: '2', name: `${'2'.green}. Listar tarea` },
    const choices = tareas.map( ( tarea, i ) => {

        const idx = ` ${i +1}. `.green;

        return {
            value: tarea.id,
            name: `${idx} ${ tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );
    return id;
    
}

const confirmar = async(message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( pregunta );
    return ok;

}

const listadoTareasConfirmar = async( tareas = []) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = ` ${i +1}. `.green;

        return {
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta );
    return ids;
    
}


export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasConfirmar
}