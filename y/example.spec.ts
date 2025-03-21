import { test, expect } from '@playwright/test';
import { credentials } from '../config/secrets';  // Importa credenciales

test('Login automático en una página con caso exitoso', async ({ page }) => {
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


});
test('Login automático en una página con caso falllido', async ({ page }) => {
    //Caso fallido credenciales incorrectas
    await page.goto(credentials.url);

    // Esperar que los campos de usuario y contraseña estén visibles
    await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
    await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });
  
    // Llenar usuaio y contraseña
    await page.getByPlaceholder('Usuario').fill('666');
    await page.getByPlaceholder('Contraseña').fill('demo');
    // hace click en el boton de ingresar
    const button2 = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]');
    await button2.click();
    // Esperar el mensaje de error
    await expect(page.getByText("La combinación de usuario y clave no coincide")).toBeVisible();
  
     // Esperar que los campos de usuario y contraseña estén visibles
     await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
     await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });
   
     // Llenar usuaio y contraseña
     await page.getByPlaceholder('Usuario').fill('abc');
     await page.getByPlaceholder('Contraseña').fill('demo');
     // hace click en el boton de ingresar
     await button2.click();
     // Esperar el mensaje de error
     await expect(page.getByText("La combinación de usuario y clave no coincide")).toBeVisible();


   });
   test('Login automático en una página y ver mis Materias,Horarios,Inasistencia', async ({ page }) => {
    // Caso exitoso credenciales funcionando
    await page.goto(credentials.url);
  
    // Esperar que los campos de usuario y contraseña estén visibles
    await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
    await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });
  
    // Llenar usuaio y contraseña
    await page.getByPlaceholder('Usuario').fill(credentials.usuario);
    await page.getByPlaceholder('Contraseña').fill(credentials.contraseña);
    // hace click en el boton de ingresar
    const button = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]'); //Se usa porque input no tiene texto 
    await button.click();
    //Se verifica que se redirife correctamente
    await expect(page).toHaveURL(credentials.url2);
    await expect(page.locator('text=Magallanes, Rodrigo Ezequiel - Ingeniería en Sistemas de Información(R. M. Nº 556/17) - Central')).toBeVisible();
     //Se ingresa a cursado
     const button2 = await page.locator('#ctl00_PanelCursado_header'); //# porque los id son unicos
     await button2.click();


     // Seleccionar el enlace de "Materias - Horarios - Aulas"
    const materiasLink = await page.locator('a[href="MateriaHorarioAula.aspx?Sel=0"]'); //Se usa href porque es un buen identificador de enlaces.

    // Hacer click en el enlace
    await materiasLink.click();

  
  
  });
