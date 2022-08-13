// Node srver which will handle socket io connections

const io = require("socket.io")(8000,{
    cors: {
        origin: '*',
      }
});

const users = {}

io.on("connection",socket=>{
    // If new users joined let other user connected to server knows
    socket.on("new-user-joined",name=>{
        users[socket.id] = name;
        console.log(name);
        socket.broadcast.emit("new-user",name);
    })

    socket.on("message-sent",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
    })

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})