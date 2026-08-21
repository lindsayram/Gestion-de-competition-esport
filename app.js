// Import des packages
const express = require('express')
const app = express()
const cors = require('cors')
const helmet= require ('helmet')
const rateLimit = require('express-rate-limit')
const port = 3001

// Utilisation des variables sur .env
require('dotenv').config()

// Connexion à MongoDB
require('./config/db')

// Import des routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const teamRoutes = require('./routes/teamRoutes')
const tournamentRoutes = require('./routes/tournamentRoutes')

// Limiter le nb d'appel à notre API
const limiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    limit: 100,
    message: { status: 429, error: 'Trop de requête réessayez plus tard'}
})

app.use(express.json())
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: {policy: "cross-origin"}
    })
)
app.use(cors())
app.use(limiter)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/teams', teamRoutes)
app.use('/api/v1/tournaments', tournamentRoutes)

app.get('/', (req, res) =>{
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () =>{
    console.log(`Serveur démarré sur http://localhost:${port}`)
})