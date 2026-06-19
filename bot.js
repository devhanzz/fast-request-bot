const { io } = require("socket.io-client");

const SERVER_URL = " "; 

const bot = io(SERVER_URL, {
    transports: ['websocket']
});

bot.on("connect", () => {
    console.log(`Bot connected: ${bot.id}`);
    
    bot.emit("initUser", {
        localTime: new Date().toLocaleTimeString(),
        localDate: new Date().toLocaleDateString()
    });
});

setInterval(() => {
    if (bot.connected) {
        bot.emit("initUser", {
            localTime: new Date().toLocaleTimeString(),
            localDate: new Date().toLocaleDateString()
        });
    }
}, 30000);
