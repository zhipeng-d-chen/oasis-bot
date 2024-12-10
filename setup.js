import { readToken, delay } from "./utils/file.js";
import { showBanner } from "./utils/banner.js";
import { loginFromFile } from "./utils/login.js";
import { createProviders } from "./utils/providers.js";
import { logger } from "./utils/logger.js";
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  showBanner();
  // 询问创建供应商的数量
  const input = await askQuestion('请输入您想要创建的供应商数量 [1-100]: ');
  const numProv = parseInt(input, 10);
  
  if (isNaN(numProv) || numProv < 1 || numProv > 100) {
    logger("输入无效。请输入1到100之间的数字。", "", "error");
    rl.close();
    return;
  }

  // 模拟代理逻辑：这里可以自定义一个默认的代理列表，或者完全跳过代理逻辑
  const proxies = []; // 这里为空数组表示没有使用代理
  const isLogin = await loginFromFile('accounts.txt');

  if (isLogin === false) {
    logger("没有账户成功登录。程序退出...", "", "error");
    rl.close();
    return; 
  }

  logger(`正在创建 ${numProv} 个供应商...`);
  await createProviders(numProv);

  rl.close();
}

setup();
