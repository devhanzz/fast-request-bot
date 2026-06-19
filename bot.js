const { io } = require("socket.io-client");

const SERVER_URL = "https://visitor-live-counter.onrender.com";
const BOT_COUNT = 1000;

function createBot(id) {
  const socket = io(SERVER_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });

  socket.on("connect", () => {
    console.log(`Bot #${id} connected: ${socket.id}`);
    
    // Initial trigger
    socket.emit("initUser", {
      localTime: new Date().toLocaleTimeString(),
      localDate: new Date().toLocaleDateString()
    });
  });

  // Interval para manatiling active (10 minutes para iwas overload)
  setInterval(() => {
    if (socket.connected) {
      socket.emit("initUser", {
        localTime: new Date().toLocaleTimeString(),
        localDate: new Date().toLocaleDateString()
      });
    }
  }, 600000); 

  socket.on("disconnect", (reason) => {
    console.log(`Bot #${id} disconnected: ${reason}`);
  });
}

// Loop para i-spawn ang 1,000 bots
for (let i = 1; i <= BOT_COUNT; i++) {
  setTimeout(() => {
    createBot(i);
  }, i * 50); // 50ms interval para hindi ma-ban agad ng server ang IP mo
}