const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const fs = require('fs');
const path = require('path');

const TOKEN = "thr1.AAAAAGm0mLpJjwE0XF7RJw.5Hkzo2VV-nU";

(async () => {
  console.log("Iniciando navegador con Chromium embebido...");

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('HAXBALL LOG:', msg.text()));

  console.log("Cargando HaxBall Headless...");
  await page.goto('https://www.haxball.com/headless');

  await page.waitForFunction('typeof window.HBInit !== "undefined"');

  console.log("Inyectando Espn Script.txt...");

  const scriptPath = path.join(__dirname, 'Espn Script.txt');
  if (!fs.existsSync(scriptPath)) {
    console.error("❌ NO SE ENCONTRÓ Espn Script.txt");
    return;
  }

  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  await page.evaluate((script, token) => {
    const scriptConToken = script.replace(/token:\s*"[^"]*"/, `token: "${token}"`);
    const runScript = new Function(scriptConToken);
    runScript();
  }, scriptContent, TOKEN);

})();
