import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin relatif vers inscription.html
const htmlPath = path.resolve(__dirname, './inscription.html');

// Test Playwright pour le formulaire d'inscription

test('Formulaire inscription fonctionne', async ({ page }) => {
  await page.goto('file://' + htmlPath);

  await page.fill('#name', 'martinez');
  await page.fill('#email', 'martinez@example.com');
  await page.fill('#password', 'motdepasse123');
  await page.fill('#confirmPassword', 'motdepasse123');
  await page.click('button[type="submit"]');

  const message = await page.textContent('#message');
  expect(message.trim().length).toBeGreaterThan(0);
});