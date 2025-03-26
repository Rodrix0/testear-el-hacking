import { test, expect } from '@playwright/test';
import { credentials } from '../config/secrets2';  // Importa credenciales
//test.use({ headless: false }); // Esto abre el navegador real


  test('Login automático en el aula', async ({ page }) => {
    // Caso exitoso credenciales funcionando
    await page.goto(credentials.urlAula);
  
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
    await expect(page).toHaveURL(credentials.url2Aula);

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

  const foroLink = page.locator('span.instancename', { hasText: "Foro de Dudas y Consultas 2025" });
  await foroLink.scrollIntoViewIfNeeded(); // Hace scroll si es necesario
  await foroLink.click(); // Hace clic en el foro

  await expect(page).toHaveURL(credentials.foroing);

  const foroLinkEnter = page.locator('div.p-3.p-l-0 a[title*="Clase Mie 19/Marzo"]');
  await foroLinkEnter.scrollIntoViewIfNeeded();
  await foroLinkEnter.waitFor({ state: 'visible' });
  await foroLinkEnter.click();



    
  await expect(page.locator('text=Foro de Dudas y Consultas 2025 Clase Mie 19/Marzo > Pruebas y Ejercicio 1.2')).toBeVisible();

  const responderButton = page.locator('text=Responder');
  await responderButton.click();
        // Espera a que el textarea esté visible (en lugar del div principal)
  const textArea = page.locator('textarea[placeholder="Escriba su respuesta..."]');
  await expect(textArea).toBeVisible(); // Asegura que el campo de respuesta ya esté en pantalla

 /**  // Escribir en el campo de respuesta
  await textArea.fill('Esta es una respuesta automatica');

    // Localiza y hace clic en el botón "Enviar al foro"
  const sendButton = page.locator('button[data-action="forum-inpage-submit"]');
  await sendButton.waitFor({ state: 'visible' });
  await sendButton.click();*/
  const avanzadoButton = page.locator('text=Avanzada');
  await avanzadoButton.waitFor({ state: 'visible' });
  await avanzadoButton.click();



  
  
  });  