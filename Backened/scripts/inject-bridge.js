const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.join(__dirname, '..', '..', 'stitch_nutriacademy_digital_education_platform');
const SCRIPT_TAG = `\n    <!-- NutriAcademy Backend Integration Bridge -->\n    <script src="/frontend-assets/assets/js/nutri-bridge.js"></script>\n</body>`;

const folders = fs.readdirSync(FRONTEND_DIR);

folders.forEach(folder => {
  const htmlPath = path.join(FRONTEND_DIR, folder, 'code.html');
  if (fs.existsSync(htmlPath)) {
    let content = fs.readFileSync(htmlPath, 'utf-8');
    if (!content.includes('nutri-bridge.js')) {
      content = content.replace('</body>', SCRIPT_TAG);
      fs.writeFileSync(htmlPath, content, 'utf-8');
      console.log(`Injected bridge into ${folder}/code.html`);
    } else {
      console.log(`Bridge already present in ${folder}/code.html`);
    }
  }
});
