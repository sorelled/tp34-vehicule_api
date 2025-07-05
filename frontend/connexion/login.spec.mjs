import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.resolve(__dirname, './login.html');

test('Formulaire de connexion fonctionne', async ({ page }) => {
  await page.goto('file://' + htmlPath);

  // Vérifie la présence du formulaire
  await expect(page.locator('#loginForm')).toBeVisible();

  // Remplit les champs
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'motdepasse123');

  // Soumet le formulaire
  await page.click('button[type="submit"]');

  // Vérifie qu'un message s'affiche (succès ou erreur)
  const message = await page.textContent('#loginMessage');
  expect(message.trim().length).toBeGreaterThan(0);
});
