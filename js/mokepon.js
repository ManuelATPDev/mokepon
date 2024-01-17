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

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
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
let mokeponSeleccionadoJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaBuscada
let anchoMapa = window.innerWidth - 20
const anchoMaximoMapa = 420

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa
}

alturaBuscada = anchoMapa*340 / 420

mapa.width = anchoMapa - 40
mapa.height = alturaBuscada

class Mokepon {
    constructor(nombre, foto, vida, elemento, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.elemento = elemento
        this.ataques = []
        this.ancho = 90
        this.alto = 90
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let aquax = new Mokepon('Aquax', 'assets/Aquax.jpeg', 3, 'agua', 'assets/AquaxIcono.png')
let pyrax = new Mokepon('Pyrax', 'assets/Pyrax.jpeg', 3, 'fuego', 'assets/PyraxIcono.png')
let terrax = new Mokepon('Terrax', 'assets/Terrax.jpeg', 3, 'tierra', 'assets/TerraxIcono.png')
let hydrax = new Mokepon('Hydrax', 'assets/Hydrax.jpeg', 3, 'agua', 'assets/HydraxIcono.png')


const aquaxAtaques = [
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
]

const hydraxAtaques = [
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
]

const pyraxAtaques = [
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
]

const terraxAtaques = [
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra', elemento: 'tierra' },
    { nombre: 'Agua 💧', id: 'boton-agua', elemento: 'agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego', elemento: 'fuego' },  
]

aquax.ataques.push(...aquaxAtaques)
pyrax.ataques.push(...pyraxAtaques)
hydrax.ataques.push(...hydraxAtaques)
terrax.ataques.push(...terraxAtaques)

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

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        jugadorId = respuesta
                        console.log(jugadorId);
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked');
    
    if(mascotaSeleccionada) {
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
        }
        
        sectionSeleccionarMascota.style.display = "none"

        sectionVerMapa.style.display = "flex"

        iniciarMapa()
        extraerAtaques(mascotaJugador)
        obtenerMokepon()
        dibujarCanvas()
        seleccionarMokepon(mascotaJugador)
    } else{
        alert('Debes seleccionar una mascota')
    }
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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
            
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ( { ataques }){
                        if (ataques.length == 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function combate(){
    clearInterval(intervalo)

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

function dibujarCanvas(){
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    
    mokeponSeleccionadoJugador.x = mokeponSeleccionadoJugador.x + mokeponSeleccionadoJugador.velocidadX
    mokeponSeleccionadoJugador.y = mokeponSeleccionadoJugador.y + mokeponSeleccionadoJugador.velocidadY
    
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mokeponSeleccionadoJugador.pintarMokepon()

    enviarPosicion(mokeponSeleccionadoJugador.x, mokeponSeleccionadoJugador.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        if (mokepon != undefined) {
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })

    if(mokeponSeleccionadoJugador.velocidadX !== 0 || mokeponSeleccionadoJugador.velocidadY !== 0) {
        detenerEnBorde()
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, //es lo mismo que decir x: x
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        if (enemigo.mokepon != undefined) {
                            const nombreMokeponEnemigo = enemigo.mokepon.nombre || ""
                            if (nombreMokeponEnemigo === "Aquax") {
                                mokeponEnemigo = new Mokepon('Aquax', 'assets/Aquax.jpeg', 3, 'agua', 'assets/AquaxIcono.png', enemigo.id)
                            } else if (nombreMokeponEnemigo === "Hydrax") {
                                mokeponEnemigo = new Mokepon('Hydrax', 'assets/Hydrax.jpeg', 3, 'agua', 'assets/HydraxIcono.png', enemigo.id)
                            } else if (nombreMokeponEnemigo === "Pyrax"){
                                mokeponEnemigo = new Mokepon('Pyrax', 'assets/Pyrax.jpeg', 3, 'fuego', 'assets/PyraxIcono.png', enemigo.id)
                            } else if (nombreMokeponEnemigo === "Terrax"){
                                mokeponEnemigo = new Mokepon('Terrax', 'assets/Terrax.jpeg', 3, 'tierra', 'assets/TerraxIcono.png', enemigo.id)
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        }
                    })
                })
        }
    })
}

function moverArriba() {
    event.preventDefault();
    mokeponSeleccionadoJugador.velocidadY = -5
}

function moverDerecha() {
    event.preventDefault();
    mokeponSeleccionadoJugador.velocidadX = 5
}

function moverIzquierda() {
    event.preventDefault();
    mokeponSeleccionadoJugador.velocidadX = -5
}

function moverAbajo() {
    event.preventDefault();
    mokeponSeleccionadoJugador.velocidadY = 5
}

function detenerMovimiento() {
    mokeponSeleccionadoJugador.velocidadX = 0
    mokeponSeleccionadoJugador.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowRight':
            moverDerecha()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;    
    
        default:
            break;
    }
}

function iniciarMapa() {
    intervalo = setInterval(dibujarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerMokepon() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            mokeponSeleccionadoJugador = mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y + 30
    const abajoEnemigo = enemigo.y + enemigo.alto - 30
    const derechaEnemigo = enemigo.x + enemigo.ancho - 30
    const izquierdaEnemigo = enemigo.x + 30

    const arribaMascota = mokeponSeleccionadoJugador.y
    const abajoMascota = mokeponSeleccionadoJugador.y + mokeponSeleccionadoJugador.alto
    const derechaMascota = mokeponSeleccionadoJugador.x + mokeponSeleccionadoJugador.ancho
    const izquierdaMascota = mokeponSeleccionadoJugador.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    //alert("Hay colision con "+ enemigo.nombre)
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id

    seleccionarMascotaEnemigo(enemigo)
    sectionAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
}

function detenerEnBorde() {
    const arribaMapa = 0
    const abajoMapa = mapa.height - mokeponSeleccionadoJugador.alto
    const derechaMapa = mapa.width
    const izquierdaMapa = 0

    const arribaMascota = mokeponSeleccionadoJugador.y
    const abajoMascota = mokeponSeleccionadoJugador.y + mokeponSeleccionadoJugador.alto
    const derechaMascota = mokeponSeleccionadoJugador.x + mokeponSeleccionadoJugador.ancho
    const izquierdaMascota = mokeponSeleccionadoJugador.x

    if (arribaMascota < arribaMapa) {
        mokeponSeleccionadoJugador.y = arribaMapa
    }

    if (arribaMascota > abajoMapa) {
        mokeponSeleccionadoJugador.y = abajoMapa
    }

    if (izquierdaMascota < izquierdaMapa) {
        mokeponSeleccionadoJugador.x = izquierdaMapa
    }
    
    if (derechaMascota > derechaMapa) {
        mokeponSeleccionadoJugador.x = derechaMapa - mokeponSeleccionadoJugador.ancho
    }
}