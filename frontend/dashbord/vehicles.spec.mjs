import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.resolve(__dirname, './vehicles.html');

test('Affichage de la liste des véhicules', async ({ page }) => {
  await page.goto('file://' + htmlPath);

  // Vérifie le titre de la page
  await expect(page.locator('h2')).toHaveText(/Liste des Véhicules/);

  // Vérifie la présence du tableau
  await expect(page.locator('table')).toBeVisible();

  // Vérifie qu'il y a au moins 4 lignes de véhicules
  await expect(page.locator('tbody tr')).toHaveCount(4);

  // Vérifie la présence des boutons d'action sur la première ligne
  const firstRow = page.locator('tbody tr').first();
  await expect(firstRow.locator('.edit-btn')).toBeVisible();
  await expect(firstRow.locator('.delete-btn')).toBeVisible();

  // Vérifie la présence du bouton de retour
  await expect(page.getByRole('link', { name: /Retour au Dashboard/i })).toBeVisible();
});
