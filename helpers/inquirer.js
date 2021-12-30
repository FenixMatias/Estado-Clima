const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que opción desea elegir?\n'.yellow,
        choices: [
            {
                value: 1,
                name: `${'1.'.green} ${'Buscar ciudad'}` 
            },
            {
                value: 2,
                name: `${'2.'.green} ${'Historial de busqueda'}`
            },
            {
                value: 0,
                name: '0. Salir'
            },
       ]
    }       
];

const inquirerMenu = async() => {
    
    console.clear();

    console.log('=================================='.yellow);
    console.log('     Seleccione una opción        '.white);
    console.log('==================================\n'.yellow);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];

    console.log('\n')
    await inquirer.prompt(question);

}

const leerInput = async( message ) => {

    console.log();
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor! :('.red
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;


}

const listarLugares = async(lugares = []) => {

    console.log();

    const choices = lugares.map((lugar, i) => {

        const idx = `${i + 1}`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    });
    
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione el lugar:'.yellow,
            choices
        }
    ];
    const { id } = await inquirer.prompt(pregunta);
    return id;
    
}

const confirmar =async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheklist = async(tareas = []) => {

    console.log();

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione'.yellow,
            choices
        }
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheklist
}