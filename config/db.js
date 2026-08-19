const mongoose = require ('mongoose')

const dbURI = process.env.MONGODB_URI

mongoose.connect(dbURI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Echec de connexion à MongoDB'))

module.exports = mongoose.connection