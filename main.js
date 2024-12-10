import { readToken, delay } from "./utils/file.js";
import { createConnection } from "./utils/websocket.js";
import { showBanner } from "./utils/banner.js";
import { logger } from "./utils/logger.js";

async function start() {
    showBanner();
    const tokens = await readToken("providers.txt");

    if (tokens.length === 0) {
        logger("未找到任何供应商令牌。程序退出...");
        return;
    }

    // 移除代理逻辑，直接根据令牌创建连接
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        await createConnection(token); // 不再传递 proxy 参数
        await delay(5000);
    }

    logger("所有供应商的连接已完成。");
}

start();
