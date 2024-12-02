import { readToken, delay } from "./utils/file.js";
import { showBanner } from "./utils/banner.js";
import { loginFromFile } from "./utils/login.js";
import { createProviders } from "./utils/providers.js";
import { logger } from "./utils/logger.js";

async function setup() {
    showBanner();
    const proxies = await readToken("proxy.txt");
    const isLogin = await loginFromFile('accounts.txt');
    let numProv = proxies.length;
    if (proxies.length === 0) { 
        logger('No proxies found in proxy.txt Exiting...', "", "error");
        return; 
    };
    if (!isLogin) {
        logger("No accounts were successfully logged in. Exiting...", "", "error");
        return; 
    }
    if (numProv > 100) {
        numProv = 100;
        logger("Maximum of 100 Providers allowed per account.", "", "warn");
    }

    logger(`Creating ${numProv} Providers...`);
    await createProviders(numProv);
}

setup();
