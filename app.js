const express = require('express')
const path = require('path')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000
const rooms = {};

io.on('connection', function(socket){
    console.log('A user has connected')
    console.log(rooms)
    socket.on('connected', function(roomName){
        console.log(roomName, 'test')
        if(roomName !== ''){
            if(rooms[roomName] && rooms[roomName].length === 1){
                rooms[roomName].push(socket)
            } else if(!rooms[roomName]){ // checks if room does not exist
                rooms[roomName] = [socket]
            } else {
               socket.emit('errorMsg', "Room full, try a different room")
            }
        }
    })
    socket.on('choice', function(choice){
        console.log(choice)
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/css/style.css'))
})
app.get('/js/script.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/js/script.js'))
})

http.listen(port, function(){
    console.log('listening on localhost: ' + port)
})
