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

io.on("connection",function (socket) {
  clientNumber = Object.keys(io.sockets.connected).length
  console.log('player number : '+clientNumber);
  socket.join('board', () => {
    let rooms = Object.keys(socket.rooms);
  });
  //console.log(Object.keys(io.sockets.connected).length)
  // console.log(io.sockets.connected)
  if (clientNumber>2) {
    socket.leave('board',function () {
      console.log('Room is full');
    })
  }else {
    socket.on("ballMove",function (data) {
      console.log(data);
      //emit data to each sockets
      io.sockets.emit("ballMove",data)
    })
  }
})


console.log("Server Running at PORT: 3000  CNTL-C to quit")
console.log("To Test:")
console.log("Open several browsers at: http://localhost:3000/")
