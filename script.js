// Variables globales
let trabajos = [];
let votos = {};
let retoActual = "Escribe un cuento corto sobre un tema aleatorio.";
let fechaInicio = new Date(2024, 9, 1); // 1 de Octubre de 2024
let fechaFin = new Date(2024, 9, 31); // 31 de Octubre de 2024

// Simula el envío de un trabajo de un usuario
function enviarTrabajo(titulo, descripcion, usuario) {
    const nuevoTrabajo = {
        id: trabajos.length + 1,
        titulo,
        descripcion,
        usuario,
        votos: 0
    };
    trabajos.push(nuevoTrabajo);
    actualizarInterfaz();
}

// Función para votar por un trabajo
function votarTrabajo(idTrabajo) {
    if (votos[idTrabajo]) {
        alert("¡Ya votaste por este trabajo!");
        return;
    }
    // Registro el voto en el objeto votos
    votos[idTrabajo] = true;
    // Incremento el contador de votos para el trabajo
    trabajos = trabajos.map(trabajo => {
        if (trabajo.id === idTrabajo) {
            trabajo.votos++;
        }
        return trabajo;
    });
    actualizarInterfaz();
}

// Función para mostrar los trabajos
function mostrarTrabajos() {
    const contenedorTrabajos = document.getElementById("trabajos");
    contenedorTrabajos.innerHTML = ""; // Limpiar el contenedor de trabajos

    trabajos.forEach(trabajo => {
        const trabajoDiv = document.createElement("div");
        trabajoDiv.classList.add("trabajo");

        const titulo = document.createElement("h3");
        titulo.innerText = trabajo.titulo;

        const descripcion = document.createElement("p");
        descripcion.innerText = trabajo.descripcion;

        const usuario = document.createElement("p");
        usuario.innerText = `Por: ${trabajo.usuario}`;

        const votosP = document.createElement("p");
        votosP.innerText = `Votos: ${trabajo.votos}`;

        const botonVotar = document.createElement("button");
        botonVotar.innerText = "Votar";
        botonVotar.onclick = () => votarTrabajo(trabajo.id);

        trabajoDiv.appendChild(titulo);
        trabajoDiv.appendChild(descripcion);
        trabajoDiv.appendChild(usuario);
        trabajoDiv.appendChild(votosP);
        trabajoDiv.appendChild(botonVotar);

        contenedorTrabajos.appendChild(trabajoDiv);
    });
}

// Función para destacar los trabajos más votados del mes
function mostrarGanadores() {
    // Ordenar los trabajos por número de votos de forma descendente
    trabajos.sort((a, b) => b.votos - a.votos);
    const ganadores = trabajos.slice(0, 3); // Los tres más votados

    const contenedorGanadores = document.getElementById("ganadores");
    contenedorGanadores.innerHTML = "<h2>Ganadores del mes</h2>";

    ganadores.forEach((trabajo, index) => {
        const ganadorDiv = document.createElement("div");
        ganadorDiv.classList.add("ganador");

        const titulo = document.createElement("h3");
        titulo.innerText = `${index + 1}. ${trabajo.titulo}`;

        const descripcion = document.createElement("p");
        descripcion.innerText = trabajo.descripcion;

        const usuario = document.createElement("p");
        usuario.innerText = `Por: ${trabajo.usuario}`;

        const votosP = document.createElement("p");
        votosP.innerText = `Votos: ${trabajo.votos}`;

        ganadorDiv.appendChild(titulo);
        ganadorDiv.appendChild(descripcion);
        ganadorDiv.appendChild(usuario);
        ganadorDiv.appendChild(votosP);

        contenedorGanadores.appendChild(ganadorDiv);
    });
}

// Función para actualizar la interfaz con los trabajos y ganadores
function actualizarInterfaz() {
    mostrarTrabajos();

    // Verifica si estamos al final del mes
    const fechaActual = new Date();
    if (fechaActual > fechaFin) {
        mostrarGanadores();
    }
}

// Función de inicialización
function inicializar() {
    // Muestra la descripción del reto actual
    document.getElementById("reto").innerText = `Reto de la semana: ${retoActual}`;

    // Cargar la interfaz inicial
    actualizarInterfaz();
}

// Llamada a la función de inicialización cuando la página cargue
window.onload = inicializar;

// Función para manejar el envío de un nuevo trabajo
document.getElementById("formularioTrabajo").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("tituloTrabajo").value;
    const descripcion = document.getElementById("descripcionTrabajo").value;
    const usuario = document.getElementById("usuarioTrabajo").value;

    if (titulo && descripcion && usuario) {
        enviarTrabajo(titulo, descripcion, usuario);
        // Limpiar el formulario después de enviar
        document.getElementById("tituloTrabajo").value = '';
        document.getElementById("descripcionTrabajo").value = '';
        document.getElementById("usuarioTrabajo").value = '';
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
