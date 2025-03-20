import { test, expect } from '@playwright/test';
import { credentials } from '../config/secrets';  // Importa credenciales

test('Login automático en una página', async ({ page }) => {
  // Caso exitoso credenciales funcionando
  await page.goto(credentials.url);

  // Esperar que los campos de usuario y contraseña estén visibles
  await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });

  // Llenar usuaio y contraseña
  await page.getByPlaceholder('Usuario').fill(credentials.usuario);
  await page.getByPlaceholder('Contraseña').fill(credentials.contraseña);
  // hace click en el boton de ingresar
  const button = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]');
  await button.click();
  //Se verifica que se redirife correctamente
  await expect(page).toHaveURL(credentials.url2);
  await expect(page.locator('text=Magallanes, Rodrigo Ezequiel - Ingeniería en Sistemas de Información(R. M. Nº 556/17) - Central')).toBeVisible();




  
  //Caso fallido credenciales incorrectas
  await page.goto(credentials.url);

  // Esperar que los campos de usuario y contraseña estén visibles
  await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });

  // Llenar usuaio y contraseña
  await page.getByPlaceholder('Usuario').fill('43098654');
  await page.getByPlaceholder('Contraseña').fill('Rodrigoror1');
  // hace click en el boton de ingresar
  const button2 = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]');
  await button2.click();
  // Esperar el mensaje de error
  await expect(page.getByText("La combinación de usuario y clave no coincide")).toBeVisible();

});
