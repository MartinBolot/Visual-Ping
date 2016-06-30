var socket = io.connect('http://localhost:3000');
socket.on('ping', function (pingResult) {
    var pingList = document.getElementById('ping_list');
    var newLi = document.createElement('li');
    if (pingResult) {
        newLi.innerText = pingResult.time;
        pingList.appendChild(newLi);
    }
});
