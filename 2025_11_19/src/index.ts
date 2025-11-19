import 'dotenv/config'
import express from 'express'

import { wpisRouter } from './wpis-router'
import { komentarzRouter } from './komentarz-router'
import { kategoriaRouter } from './kategoria-router'

const app = express()

app.use('/wpis', wpisRouter)
app.use('/komentarz', komentarzRouter)
app.use('/kategoria', kategoriaRouter)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})