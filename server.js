const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 3000
app.listen(PORT)

const ROOT_DIR = "html"

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mine(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext,filename.length-ext.length)!==-1) {
      return MIME_TYPES[ext]
    }
  }
return MIME_TYPES['txt']
}



//handle req and res
function handler(request,response) {
    let urlObj = url.parse(request.url,true,false)
    console.log("\n============================")
    console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    let receivedData = ""

    request.on("data",function (chunk) {
      receivedData += chunk
    })

    request.on("end",function () {
      console.log("REQUEST END: ")
      console.log("received data: ", receivedData)
      console.log("type: ", typeof receivedData)

      if (request.method=="GET") {
        if (urlObj.pathname === "/") {
          urlObj.pathname += "index.html"
        }
        fs.readFile(ROOT_DIR+urlObj.pathname,function (err,data) {
          if (err) {
            console.log("ERROR: " + JSON.stringify(err))
            response.writeHead(404)
            response.end(JSON.stringify(err))
            return
          }

          response.writeHead(200,{
            "Content-Type" : get_mine(urlObj.pathname)
          })

          response.end(data)
        })
      }
    })

}

let clientNumber = 0
let players = []
let playerWait = []
let start = true

io.on("connection",function (socket) {
  clientNumber = Object.keys(io.sockets.connected).length
  //console.log(Object.keys(io.sockets.connected))
  console.log('player number : '+clientNumber)
  socket.join('board', () => {
    let rooms = Object.keys(socket.rooms);
  });
  socket.on("ballMove",function (data) {
    //console.log(data)
    //emit data to each sockets
    io.sockets.emit("ballMove",data)
  })
  socket.on("players",function (data) {
    if(clientNumber>2){
      socket.leave('board',function () {
        console.log('Room is full')
      })
      // socket.broadcast.to(socket.id).emit("showAlert")
      playerWait.push(socket.id)
      for(playerObj of playerWait){
        if(playerObj.id == socket.id){
          console.log(socket.id + "'s alert")
          socket.broadcast.to(playerObj.id).emit("showAlert",playerObj.id)
        }
      }
    }else{
      players.push(socket.id)
      // Object.keys(io.sockets.connected).forEach(function (id) {
      //   if(socket.id == id){
      //     console.log(socket.id)
      //   }
      // })
      if(start){
        io.sockets.emit("yourTurn", socket.id)
        console.log(socket.id)
        start = false
      }
    }
  })
  socket.on("switchTurn", function (data){
    for(playerObj of players){
      if(playerObj != data){
        console.log(data + "'s turn")
        socket.broadcast.to(playerObj).emit("yourTurn", playerObj)
      }
    }
  })

  socket.on("disconnect", function(){
    // console.log("disconnect: " + socket.id)
    // console.log("player list: " + players[0])
    // console.log("player list: " + players[1])
    // console.log("player wait list: " + playerWait[0])
    for(let i=0;i<players.length;i++){
      if(players[i] == socket.id){
        // console.log("process")
        players[i] = playerWait.shift()
      }
    }
    // console.log("update player list: " + players[0])
    // console.log("update player list: " + players[1])
    // console.log("update player wait list: " + playerWait[0])
  })

  // socket.on("playerFound", function(){
  //   console.log(Object.keys(socket.id) + " connect")
  //   socket.connect("http://" + window.document.location.host, {'forceNew': true});
  // })
})


console.log("Server Running at PORT: 3000  CNTL-C to quit")
console.log("To Test:")
console.log("Open several browsers at: http://localhost:3000/")
