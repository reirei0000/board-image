const { registerFont, createCanvas, loadImage, Canvas } = require('canvas')

var image_list = {}

function load_images(name, baseurl, max, ext) {
  image_list[name] = {}

  for (let i = 0; i < max; i++) {
    loadImage(`${baseurl}${i}.${ext}`).then((image) => { image_list[name][i] = image })
  }
}


function create_board(name, cards, cols, rows, card_width, card_height) {
  let board_width = card_width * cols
  let board_height = card_height * rows

  let canvas = createCanvas(board_width, board_height)
  let ctx = canvas.getContext('2d')

  ctx.fillStyle = "#24374c"
  ctx.fillRect(0, 0, board_width, board_height)

  let x = 0, y = 0
  for (let i = 0; i < cards.length; i++) {
    let image = image_list[name][cards[i]]

    x = i % cols
    y = Math.floor(i / cols)
    ctx.save()
    ctx.translate(card_width * x, card_height * y);
    ctx.rotate(Math.random() / 10)
    ctx.drawImage(image, 0, 0, card_width, card_height, 0, 0, card_width, card_height)
    ctx.restore()
  }

  registerFont('./fonts/ipaexg.ttf', { family: 'IPAexGothic', weight: 400 })

  for (let i = 0; i < cards.length; i++) {
    x = i % cols
    y = Math.floor(i / cols) + 1

    let text = `${String.fromCharCode(65 + x)}${y}`
    let text_width = ctx.measureText(text)
    ctx.font = `${Math.floor(card_width / 4)}px IPAexGothic`;
    ctx.fillStyle = "gray";
    ctx.strokeText(text, x * card_width + card_width / 2, y * card_height)
    ctx.fillStyle = "white";
    ctx.fillText(text, x * card_width + card_width / 2, y * card_height)
  }

  return canvas
}

module.exports = { load_images, create_board }
