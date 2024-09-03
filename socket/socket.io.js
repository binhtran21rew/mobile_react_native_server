const {Server} = require("socket.io");
const io = new Server({cors: ["http://localhost:8081", "exp://192.168.1.7:8081"]});

const {
    checkToken
} = require('../config/JWT')

let onlineUser = [];


io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", async (user) => {
        if(user){
            const authData = await checkToken(user);
    
                !onlineUser.some((item) => item.userId === authData.data.id) &&
                onlineUser.push({
                    userId: authData.data.id,
                    socketId: socket.id
            });
            io.emit("getOnlineUser", onlineUser);
        }
    })
    socket.on("clearUser", async (user) => {
        if(user){
            const authData = await checkToken(user);
                const findIndex = onlineUser.findIndex((item) => item.userId === authData.data.id)
            onlineUser.splice(findIndex, 1);
            io.emit("getOnlineUser", onlineUser);
        }
    })

    socket.on("sendMessage", async (message) => {
        if(message){
            const user = onlineUser.find((user) => user.userId === message.MessageRecipient[0].UserId[0]);
            if(user){
                io.to(user.socketId).emit("getMessage", message);
            }
        }
    })



    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter(user => user.socketId !== socket.id);
        io.emit("getOnlineUser", onlineUser);
    })
})


io.listen(4000);
