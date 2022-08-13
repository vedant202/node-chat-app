const socket = io('http://localhost:8000');
console.log(socket)

const messagecontainer = document.querySelector('.container');
const messageInp = document.getElementById("messageInp");
const form = document.getElementById('send-container');
let audio = new Audio('ting.mp3')

const append = (message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageElement.innerText = message;
    messagecontainer.append(messageElement);
    if(position==='left'){
        audio.play();
    }
}


let name = prompt("Enter your name to join")
console.log(name)
socket.emit('new-user-joined',name);

socket.on("new-user",userName=>{
    append(`${userName} joined the chat`,'right');
})

socket.on('receive',(messageObj)=>{
    append(`${messageObj.name} : ${messageObj.message}`,'left');
})

socket.on('left',user=>{
    append(`${user} left the chat`,'right');
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let message = messageInp.value;
    append(`You:${message}`,'right');
    socket.emit('message-sent',message);
    messageInp.value="";

})

