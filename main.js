import { readToken, delay } from "./utils/file.js";
import { createConnection } from "./utils/websocket.js";
import beddu from "./utils/banner.js";
import { logger } from "./utils/logger.js";

async function start() {
    console.log(beddu)
    const tokens = await readToken("providers.txt");

    // Remove proxy-related logic
    logger("Running Without Proxy...", "", "warn");

    // Create connections without proxy
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        await createConnection(token);
        await delay(1000);
    }
}

start();
