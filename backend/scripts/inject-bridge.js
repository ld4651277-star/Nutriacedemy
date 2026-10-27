const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.join(__dirname, '..', '..', 'frontend');
const SCRIPT_TAG = `\n    <!-- NutriAcademy Backend Integration Bridge -->\n    <script src="assets/js/nutri-bridge.js"></script>\n</body>`;

if (fs.existsSync(FRONTEND_DIR)) {
  const files = fs.readdirSync(FRONTEND_DIR);

  files.forEach(file => {
    if (file.endsWith('.html')) {
      const htmlPath = path.join(FRONTEND_DIR, file);
      let content = fs.readFileSync(htmlPath, 'utf-8');
      if (!content.includes('nutri-bridge.js')) {
        content = content.replace('</body>', SCRIPT_TAG);
        fs.writeFileSync(htmlPath, content, 'utf-8');
        console.log(`Injected bridge into ${file}`);
      } else {
        console.log(`Bridge already present in ${file}`);
      }
    }
  });
} else {
  console.error(`Frontend directory not found at: ${FRONTEND_DIR}`);
}
