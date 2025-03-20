import { test, expect } from '@playwright/test';
import { credentials } from '../config/secrets';  // Importa credenciales

test('Login automático en una página', async ({ page }) => {
  // 1. Ir a la URL de la página de inicio de sesión
  await page.goto(credentials.url);

  // 2. Esperar a que los campos de usuario y contraseña estén visibles
  await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });

  // 3. Llenar los campos
  await page.getByPlaceholder('Usuario').fill(credentials.usuario);
  await page.getByPlaceholder('Contraseña').fill(credentials.contraseña);

  const button = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]');
  await button.click();

  
  


  // 5. Esperar que la URL cambie después del login
  await expect(page).toHaveURL(credentials.url2);
});
