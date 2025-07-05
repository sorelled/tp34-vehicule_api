import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.resolve(__dirname, './dashbord.html');

test('Dashboard s\'affiche correctement', async ({ page }) => {
  await page.goto('file://' + htmlPath);

  // Vérifie le titre de la page
  await expect(page).toHaveTitle(/Propelize - Dashboard/);

  // Vérifie la présence de la sidebar et du logo
  await expect(page.locator('.sidebar')).toBeVisible();
  await expect(page.locator('.logo')).toContainText('Propelize');

  // Vérifie la présence des stats cards
  await expect(page.locator('.stat-card.vehicles')).toBeVisible();
  await expect(page.locator('.stat-card.users')).toBeVisible();
  await expect(page.locator('.stat-card.active')).toBeVisible();
  await expect(page.locator('.stat-card.maintenance')).toBeVisible();

  // Vérifie la présence des tableaux
  await expect(page.locator('table')).toHaveCount(2);

  // Vérifie la présence d'un bouton "Ajouter Véhicule"
  await expect(page.getByRole('link', { name: /Ajouter Véhicule/i })).toBeVisible();

  // Vérifie la présence d'un bouton "Ajouter Utilisateur"
  await expect(page.getByRole('link', { name: /Ajouter Utilisateur/i })).toBeVisible();
});