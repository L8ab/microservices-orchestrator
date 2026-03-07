const args = process.argv.slice(2);

console.log("========================================");
console.log(" L8ab Systems - microservices-orchestrator");
console.log("========================================");

if (args.includes('--run')) {
    console.log("[*] Initializing services...");
    setTimeout(() => {
        console.log("[*] Loading modules: OK");
        setTimeout(() => {
            for(let i=1; i<=3; i++) {
                const val = Math.floor(Math.random() * 900) + 100;
                console.log(`[*] Processing item #${i}: status=${val} OK`);
            }
            console.log("[+] Process completed successfully.");
        }, 1000);
    }, 1000);
} else {
    console.log("System is ready. Use 'node src/index.js --run' to start.");
}
