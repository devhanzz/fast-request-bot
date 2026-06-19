const { io } = require("socket.io-client");

const SERVER_URL = "https://visitor-live-counter.onrender.com"; 
const BOT_COUNT = 1000; 

for (let i = 0; i < BOT_COUNT; i++) {
    setTimeout(() => {
        const bot = io(SERVER_URL, {
            transports: ['websocket'],
            reconnection: false 
        });

        bot.on("connect", () => {
            console.log(`Bot #${i + 1} connected: ${bot.id}`);
            
            bot.emit("initUser", {
                localTime: new Date().toLocaleTimeString(),
                localDate: new Date().toLocaleDateString()
            });
        });

        bot.on("connect_error", () => {
            bot.disconnect();
        });
    }, i * 50); 
}