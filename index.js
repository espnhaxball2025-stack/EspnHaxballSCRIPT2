const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const TOKEN = "thr1.AAAAAGm0mLpJjwE0XF7RJw.5Hkzo2VV-nU";

(async () => {
  console.log("Levantando la sala desde el servidor...");

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process'
    ]
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('HAXBALL LOG:', msg.text()));

  await page.goto('https://www.haxball.com/headless');
  await page.waitForFunction('typeof window.HBInit !== "undefined"');

  const scriptPath = path.join(__dirname, 'Espn Script.txt');
  if (!fs.existsSync(scriptPath)) {
    console.error("❌ No se encontró Espn Script.txt");
    return;
  }

  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  await page.evaluate((script, token) => {
    const scriptConToken = script.replace(/token:\s*"[^"]*"/, `token: "${token}"`);
    const runScript = new Function(scriptConToken);
    runScript();
  }, scriptContent, TOKEN);

})();
