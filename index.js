const express = require("express") //importar la libreria de express
const cors = require("cors") //importar la libreria de cors

const app = express() //instancia del servidor

app.use(cors()) //habilitar el uso de cors y evitar errores
app.use(express.json()) //habilitar el uso de json a traves de post

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

//solicitud de recurso por parte del cliente (requires, respuesta) endpoint
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
}) 

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombreMokepon = req.body.mokepon || ""
    const mokepon = new Mokepon(nombreMokepon)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores);
    console.log(jugadorId);
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || ""
    const y = req.body.y || ""

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})


//iniciar el servidor (callback y puerto)

//se apaga el servidor con ctrl + c
 app.listen(8080, () => {
    console.log("Servidor funcionando");
 }) 