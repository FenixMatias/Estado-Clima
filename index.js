require('dotenv').config();

const { leerInput,
        pausa,
        inquirerMenu, 
        listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        //Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                //buscar lugares
                const lugares = await busquedas.ciudad(termino);
                //seleccionar lugar
                const idseleccionado = await listarLugares(lugares);
                if (idseleccionado === '0') continue;

                const lugarseleccionado = lugares.find(l => l.id === idseleccionado);

                //guardar en db
                busquedas.agregarHistorial(lugarseleccionado.nombre);

                //clima
                const clima = await busquedas.climaLugar(lugarseleccionado.lat, lugarseleccionado.lng);
                
                console.clear();
                console.log('=================================='.yellow);
                console.log('     Información de la ciudad     '.white);
                console.log('==================================\n'.yellow);
                console.log('Ciudad:'.yellow, lugarseleccionado.nombre.green);
                console.log('Lat:'.yellow, lugarseleccionado.lat);
                console.log('Lng:'.yellow, lugarseleccionado.lng);
                console.log('Temperatura:'.yellow, clima.temp);
                console.log('Mínima:'.yellow, clima.min);
                console.log('Maxima:'.yellow, clima.max);
                console.log('Como esta el clima:'.yellow, clima.desc.green);

            break;

            case 2:

                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);

                });

            break;

            case 0:
                
            break;
        
        }

        await pausa();

    } while (opt !== 0 );

}

main();
