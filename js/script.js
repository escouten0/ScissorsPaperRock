var socket = io()
var roomName
var loginStatus = false
var choice

function updateUI() {
        document.getElementById('welcome').style.display = 'none'
        document.getElementById('buttons').style.display = 'block'

        roomName = document.getElementById('roomName').value
        console.log(roomName, 'haha')
        socket.emit('connected', roomName)
        loginStatus = true
        document.getElementById('errorMsg').innerText = ''
}

function selection(e) {
    if (e == 'rock') {
        choice = 'rock'
        console.log(e)
    }
    if (e == 'paper') {
        choice = 'paper'
        console.log(e)
    }
    if (e == 'scissors') {
        choice = 'scissors'
        console.log(e)
    }
    socket.emit('choice', choice)
}
socket.on('errorMsg', function (errorMsg) {
    document.getElementById('errorMsg').innerText = errorMsg
    console.log(errorMsg)
    document.getElementById('welcome').style.display = 'block'
    document.getElementById('buttons').style.display = 'none'
    roomName = ''

})