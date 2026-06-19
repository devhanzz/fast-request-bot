async function startFastBot() {
    const targetUrl = 'https://visitor-live-counter.onrender.com'; 
    const totalRequests = 100; 

    console.log(`🚀 FAST BOT LIVE: Sending ${totalRequests} simultaneous requests to ${targetUrl}\n`);

    const requestArray = Array.from({ length: totalRequests }).map((_, i) => {
        const requestId = i + 1;
        return fetch(`${targetUrl}?bot_tracker=${Date.now()}_${requestId}`, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        })
        .then(response => {
            console.log(`[Request #${requestId}] 🟢 Status: ${response.status}`);
        })
        .catch(error => {
            console.log(`[Request #${requestId}] ❌ Error: ${error.message}`);
        });
    });

    await Promise.all(requestArray);
    console.log('\n🏁 FAST BOT: All requests sent simultaneously.');
}

startFastBot();