import express from 'express'
import cors from 'cors'

import { wpisRouter } from './routers/wpis-router'
import { komentarzRouter } from './routers/komentarz-router'
import { kategoriaRouter } from './routers/kategoria-router'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/wpis', wpisRouter)
app.use('/komentarz', komentarzRouter)
app.use('/kategoria', kategoriaRouter)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})