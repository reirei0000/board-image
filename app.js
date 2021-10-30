const express = require('express')
const path = require('path')

const board = require('./board')

const app = express()
const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

var _cards = {}

app.post('/board', function(req, res) {
  console.log(req.body)
  let name = req.body.name

  switch (req.body.command) {
    case 'images':
      let baseurl = req.body.baseurl
      let num = req.body.num
      let ext = req.body.ext
      board.load_images(name, baseurl, num, ext)
      res.send('images ok.')
      break

    case 'draw':
      let canvas = board.create_board(
        name, req.body.cards,
        req.body.cols, req.body.rows, req.body.card_width, req.body.card_height)
      res.setHeader('Content-Type', 'image/jpeg')
      canvas.createJPEGStream().pipe(res)
      res.on('finish', () => { console.log('Finished!') } )
      break
  }
})

app.listen(port)
