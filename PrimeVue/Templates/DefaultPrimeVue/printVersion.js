/* eslint-disable no-undef */
/**
 * @file printVersion.js
 * 
 * Este script lee el archivo version.json y muestra la versión actual en la consola.
 * Es ejecutado en el script "build" del package.json despues de la compilación del proyecto.
 * 
 * @date 2024-07-09
*/
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta al archivo version.json
const versionPath = `${__dirname}/public/version.json`;

// Leer el archivo version.json
fs.readFile(versionPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo version.json:', err);
    process.exit(1);
  }

  // Parsear el contenido del archivo version.json
  const versionInfo = JSON.parse(data);

  // Mostrar la versión en la consola
  if (versionInfo && versionInfo.version) {
    console.log(chalk.gray('\n---------------------------------------------------------------'));
    console.log(chalk.gray(`\nVersión actual: ${versionInfo.version}\n`));
  } else {
    console.error('No se encontró la versión en el archivo version.json');
  }
});