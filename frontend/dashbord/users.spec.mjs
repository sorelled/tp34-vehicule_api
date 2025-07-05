import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.resolve(__dirname, './users.html');

test('Affichage et édition des utilisateurs', async ({ page }) => {
  await page.goto('file://' + htmlPath);

  // Vérifie le titre de la page
  await expect(page.locator('h2')).toHaveText(/Liste des Utilisateurs/);

  // Vérifie la présence du tableau
  await expect(page.locator('table')).toBeVisible();

  // Vérifie qu'il y a au moins 3 lignes d'utilisateurs
  await expect(page.locator('tbody tr')).toHaveCount(3);

  // Vérifie la présence du bouton de retour
  await expect(page.getByRole('link', { name: /Retour au Dashboard/i })).toBeVisible();

  // Vérifie la présence du bouton Modifier sur la première ligne
  const firstRow = page.locator('tbody tr').first();
  const editBtn = firstRow.locator('.edit-btn');
  await expect(editBtn).toBeVisible();

  // Clique sur Modifier et vérifie l'apparition des champs d'édition
  await editBtn.click();
  await expect(firstRow.locator('input[type="text"]')).toBeVisible();
  await expect(firstRow.locator('input[type="email"]')).toBeVisible();
  await expect(firstRow.locator('select')).toHaveCount(2);

  // Annule l'édition
  await firstRow.locator('.cancel-btn').click();
  await expect(firstRow.locator('.edit-btn')).toBeVisible();
});
