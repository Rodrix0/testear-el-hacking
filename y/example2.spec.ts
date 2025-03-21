import { test, expect } from '@playwright/test';
import { credentials } from '../config/secrets2';  // Importa credenciales

test('Login automático en el aula', async ({ page }) => {
    // Caso exitoso credenciales funcionando
    await page.goto(credentials.url);
  
    // Esperar que los campos de usuario y contraseña estén visibles
    await page.waitForSelector('input[placeholder="Nombre de usuario"]', { state: 'visible' });
    await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });
  
    // Llenar usuaio y contraseña
    await page.getByPlaceholder('Nombre de usuario').fill(credentials.usuario);
    await page.getByPlaceholder('Contraseña').fill(credentials.contraseña);
    // hace click en el boton de ingresar
    const button = await page.locator('#loginbtn'); //Se usa porque input no tiene texto 
    await button.click();
    //Se verifica que se redirife correctamente
    await expect(page).toHaveURL(credentials.url2);

  // aca comienza
  const panelButton = await page.locator('button[data-action="toggle-drawer"]');

  // Verificar si el panel está cerrado
  const isPanelClosed = await panelButton.getAttribute('aria-expanded') === "false";
  
  if (isPanelClosed) {
      await panelButton.click({ force: true }); // Forzar el clic
      await page.waitForTimeout(1000); // Esperar 1 segundo (ajusta si es necesario)
  }
  
  // Esperar que el atributo realmente cambie
  await expect(panelButton).toHaveAttribute('aria-expanded', 'true', { timeout: 8000 });
  
  // Ahora puedes buscar la materia
  const button2 = await page.locator('a.list-group-item.list-group-item-action', { hasText: "3-1-Ingeniería de Software II" });
  await button2.first().click(); // Asegurar que solo seleccione el primero

    // fin

    await expect(page).toHaveURL(credentials.ingSoft);
    await expect(page.locator('h1', { hasText: "3-1-Ingeniería de Software II" })).toBeVisible();


  
  
  });