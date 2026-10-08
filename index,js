const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Sacá un token fresco de https://www.haxball.com/headlesstoken
const TOKEN = "thr1.AAAAAGm0mLpJjwE0XF7RJw.5Hkzo2VV-nU";

(async () => {
  console.log("Iniciando navegador virtual...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Muestra los mensajes de la sala en los logs de Render
  page.on('console', msg => console.log('HAXBALL LOG:', msg.text()));

  console.log("Cargando HaxBall Headless...");
  await page.goto('https://www.haxball.com/headless');

  await page.waitForFunction('typeof window.HBInit !== "undefined"');

  console.log("Inyectando tu script Espn Script.txt...");

  // Leemos tu archivo de texto
  const scriptPath = path.join(__dirname, 'Espn Script.txt');
  
  if (!fs.existsSync(scriptPath)) {
    console.error("❌ No se encontró el archivo Espn Script.txt!");
    return;
  }

  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  // Inyectamos el script adentro de la ventana de HaxBall
  await page.evaluate((script, token) => {
    // Reemplazamos el token dinámicamente si cambia
    const scriptConToken = script.replace(/token:\s*"[^"]*"/, `token: "${token}"`);
    
    // Ejecutamos el script
    const runScript = new Function(scriptConToken);
    runScript();
  }, scriptContent, TOKEN);

})();
