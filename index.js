const { Server } = require("socket.io");
const io=new Server(8000,
    {
        cors:true,
    });
const emailTosocketIdmap=new Map();
const socketidtoMap=new Map();
io.on("connection",(socket)=>{
    console.log('Socket Conneted',socket.id);
    socket.on("room:join",(data)=>{
        const {email,room}=data
        emailTosocketIdmap.set(email,socket.id)
        socketidtoMap.set(socket.id,email);
        io.to(room).emit("user:joined",{email,id:socket.id})
        socket.join(room);
        io.to(socket.id).emit("room:join",data);
        
    })
});

