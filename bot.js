const { io } = require("socket.io-client");

const SERVER_URL = "https://visitor-live-counter.onrender.com"; 
const BOT_COUNT = 500; 

for (let i = 0; i < BOT_COUNT; i++) {
    setTimeout(() => {
        const bot = io(SERVER_URL, {
            transports: ['websocket']
        });

        bot.on("connect", () => {
            console.log(`Bot #${i + 1} connected: ${bot.id}`);
            
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
    }, i * 200); 
}