URL_API = "http://localhost:8080/usuario";

function get_data_from(event) {
    const primer_nombre = document.getElementById("primer_nombre");

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


async function create(usuario) {
    //Enviar peticion
    const resp = await fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    const text = await resp.json();
    const alerta = document.getElementById("alerta");
    console.log(text);
    let alerta_p = "";
    alerta_p += ` 
    <div class="alerta error">
            <p>${text['primer_nombre']}</p>
            </div>
            <div class="alerta error">
            <p>${text['segundo_nombre']}</p>
            </div>
            <div class="alerta error">
            <p>${text['primer_apellido']}</p>
            </div>
            <div class="alerta error">
            <p>${text['segundo_apellido']}</p>
            </div>
            <div class="alerta error">
            <p>${text['email']}</p>
            </div>
            <div class="alerta error">
            <p>${text['password']}</p>
            </div>
            <div class="alerta error">
            <p>${text['celular']}</p>
            </div>
    `
    alerta.innerHTML = alerta_p;

}