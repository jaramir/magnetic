const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')
const static = require('koa-static')
const {getMagnets, setMagnet, addMagnet} = require('./magnets')

const app = new Koa()
app.use(static("./dist", {}))

const httpServer = http.createServer(app.callback())

const io = socket(httpServer, {})
io.on('connection', socket => {
  socket.emit('magnets', getMagnets())

  socket.on('magnet', data => {
    setMagnet(data) && socket.broadcast.emit('magnet', data)
  })

  socket.on('add', magnet => {
    addMagnet(magnet)
    io.emit('magnets', getMagnets())
  })
})

httpServer.listen(3000, '0.0.0.0')
