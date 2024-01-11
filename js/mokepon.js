window.addEventListener('load', iniciarJuego)

const sectionAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('nombre-mascota-jugador')

const spanMascotaEnemigo = document.getElementById('nombre-mascota-enemigo')

const sectionMensajes = document.getElementById('resultado')
const labelataquesDelJugador = document.getElementById('label-ataques-del-jugador')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const labelataquesDelEnemigo = document.getElementById('label-ataques-del-enemigo')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let indexAtaqueJugador
let ataqueEnemigo = []
let indexAtaqueEnemigo
let opcionDeMokepones
let ataquesMokeponJugador
let ataquesMokeponEnemigo
let inputAquax
let inputPyrax
let inputTerrax
let inputHydrax
let botonFuego
let botonAgua
let botonTierra
let botones = []
let mascotaJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")

class Mokepon {
    constructor(nombre, foto, vida, elemento) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.elemento = elemento
        this.ataques = []
    }
}

let aquax = new Mokepon('Aquax', 'assets/Aquax.jpeg', 3, 'agua')
let pyrax = new Mokepon('Pyrax', 'assets/Pyrax.jpeg', 3, 'fuego')
let terrax = new Mokepon('Terrax', 'assets/Terrax.jpeg', 3, 'tierra')
let hydrax = new Mokepon('Hydrax', 'assets/Hydrax.jpeg', 3, 'agua')

aquax.ataques.push(
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
)

pyrax.ataques.push(
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
)

terrax.ataques.push(
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    
)

hydrax.ataques.push(
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
)

mokepones.push(aquax,pyrax,terrax,hydrax)


function iniciarJuego(){
    sectionAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    labelataquesDelJugador.style.display = "none"
    labelataquesDelEnemigo.style.display = "none"

    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon elemento-${mokepon.elemento}" for=${mokepon.nombre}>
          <p>${mokepon.nombre}</p>
          <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `

        contenedorTarjetas.innerHTML += opcionDeMokepones
        
        inputAquax = document.getElementById('Aquax')
        inputPyrax = document.getElementById('Pyrax')
        inputTerrax = document.getElementById('Terrax')
        inputHydrax = document.getElementById('Hydrax')
    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = "none"
    //sectionAtaque.style.display = "flex"

    sectionVerMapa.style.display = "flex"
    let imagenDeAquax = new Image()
    imagenDeAquax.src = aquax.foto
    //lienzo.fillRect(5,15,20,40)
    lienzo.drawImage(
        imagenDeAquax,
        20,
        40,
        100,
        100
    )

    if(inputAquax.checked){
        spanMascotaJugador.innerHTML = inputAquax.id
        mascotaJugador = inputAquax.id
    } else if(inputPyrax.checked){
        spanMascotaJugador.innerHTML = inputPyrax.id
        mascotaJugador = inputPyrax.id
    } else if(inputTerrax.checked){
        spanMascotaJugador.innerHTML = inputTerrax.id
        mascotaJugador = inputTerrax.id
    } else if(inputHydrax.checked){
        spanMascotaJugador.innerHTML = inputHydrax.id
        mascotaJugador = inputHydrax.id
    } else{
        alert('Debes seleccionar una mascota')
        sectionSeleccionarMascota.style.display = "flex"
        sectionAtaque.style.display = "none"
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => { 
        ataquesMokeponJugador = `
        <button id=${ataque.id} class="elemento-${ataque.elemento} BAtaque">${ataque.nombre}</button>
        `
        
        contenedorAtaques.innerHTML += ataquesMokeponJugador
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque') //selecciona todos los elementos que contengan la clase BAtaque
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == 'Agua 💧') {
                ataqueJugador.push('AGUA')
                boton.style.background = '#737373'
                boton.disabled = true
            } else if (e.target.textContent == 'Fuego 🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#737373'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#737373'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }

    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        
        if ((ataqueEnemigo[i] == 'FUEGO' && ataqueJugador[i] == 'TIERRA') || (ataqueEnemigo[i] == 'AGUA' && ataqueJugador[i] == 'FUEGO') || (ataqueEnemigo[i] == 'TIERRA' && ataqueJugador[i] == 'AGUA')) {
            indexOponentes(i, i)
            victoriasEnemigo++
            crearMensaje('PERDISTE 😢')
        } else if (ataqueJugador[i] == ataqueEnemigo[i]) {
            indexOponentes(i, i)
            crearMensaje('EMPATE 😮')
        } else {
            indexOponentes(i, i)
            victoriasJugador++
            crearMensaje('GANASTE 🎉')
        }
    }
}

function indexOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function crearMensaje(resultado){
    spanVidasJugador.innerHTML = victoriasJugador
    spanVidasEnemigo.innerHTML = victoriasEnemigo
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    labelataquesDelJugador.style.display = "block"
    labelataquesDelEnemigo.style.display = "block"
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    revisarVidas()
}

function revisarVidas(){
    if (victoriasEnemigo < victoriasJugador){
        sectionMensajes.innerHTML = 'GANASTE EL JUEGO 🏆'
        sectionReiniciar.style.display = "block"

    } else if(victoriasJugador < victoriasEnemigo){
        sectionMensajes.innerHTML = 'PERDISTE EL JUEGO ❌'
        sectionReiniciar.style.display = "block"
    } else {
        sectionMensajes.innerHTML = 'EMPATE 🤝'
        sectionReiniciar.style.display = "block"
    }
}

function reiniciarJuego(){
    location.reload()
}


function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1)+min)
}

