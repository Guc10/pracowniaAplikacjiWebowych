import express from 'express'

const router = express.Router()

router.get('/get', (req, res) => {
  res.status(200).json({"ok": "ok"});
})

router.post('/post', (req, res) => {
  res.status(200).json({"ok": "ok"});
})

router.put('/put/:id', (req, res) => {
  res.status(200).json({"ok": "ok"});
})

router.delete('/delete/:id', (req, res) => {
  res.status(200).json({"ok": "ok"});
})

export { router }