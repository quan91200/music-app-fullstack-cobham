import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import admin from './routes/admin.js'
import user from './routes/user.js'
import song from './routes/song.js'
import subs from './routes/subs.js'
import playlist from './routes/playlist.js'
import friend from './routes/friend.js'
import payment from './routes/payment.js'

const app = express()

dotenv.config()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/user', user)
app.use('/api/admin', admin)
app.use('/api/song', song)
app.use('/api/subs', subs)
app.use('/api/playlist', playlist)
app.use('/api/friend', friend)
app.use('/api/payment', payment)

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Welcome to the server!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})