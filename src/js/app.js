URL_API = "http://localhost:8080/usuario";

//Funcion que espera el evento del formulario y mapea los campos hacia la base de datos 
function get_data_from(event) {
    //Indicar que no recargue pagina
    event.preventDefault();
    const form = event.target;
    const usuario = {
        primer_nombre: form.primer_nombre.value,
        segundo_nombre: form.segundo_nombre.value,
        primer_apellido: form.primer_apellido.value,
        segundo_apellido: form.segundo_apellido.value,
        email: form.email.value,
        password: form.password.value,
        celular: form.celular.value,
    }

    create(usuario)
}

//Funcion para crear usuario
async function create(usuario) {
    //Enviar peticion
    const resp = await fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    //Si retorna error 400 ejecuta alertas de la validacion de formulario
    if (resp.status == 400) {
        const text = await resp.json();
        const alerta = document.getElementById("alerta");
        let alerta_p = "";
        //Recorre los mensajes de error para el formulario y los muestrar en el html
        for (const property in text) {
            alerta_p += `
            <div class="alerta error">
                <p>${text[property]}</p>
            </div>
        
        `
        }
        //Insertar el html
        alerta.innerHTML = alerta_p;
        //Si todos los datos se encuentran bien realiza la creacion de usuario y muestrar alerta de exito
    } else {
        const text = await resp.text();
        const alerta = document.getElementById("alerta");
        let alerta_p = "";
        alerta_p = `
            <div class="alerta exito">
                <p>${text}</p>
            </div>
        `
        alerta.innerHTML = alerta_p;
    }
}