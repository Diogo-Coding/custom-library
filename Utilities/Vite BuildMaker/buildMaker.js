/**
 * @file buildMaker.js
 * 
 * Prompt de compilacion de build del proyecto, actualiza version.json y vite.config.js ademas de buildear el proyecto.
 * 
 * @date 2024-07-09
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { execSync } from 'child_process';

// __filename y __dirname no están definidos en ES module scope, los definimos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const versionPath = `${__dirname}/public/version.json`;
const viteConfigPath = `${__dirname}/vite.config.ts`;

// Función para manejar la señal SIGINT
const handleExit = () => {
  console.log('\nProceso cancelado por el usuario.');
  process.exit(1); // Salir con código de error
};

// Capturar la señal SIGINT
process.on('SIGINT', handleExit);

const getGitBranch = () => {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    return branch;
  } catch (err) {
    console.error(chalk.red('Error al obtener la rama de Git:'), err);
    process.exit(1); // Salir con código de error
  }
};

const getGitUser = () => {
  try {
    const user = execSync('git config user.name').toString().trim();
    return user;
  } catch (err) {
    console.error(chalk.red('Error al obtener el usuario de Git:'), err);
    process.exit(1); // Salir con código de error
  }
};

const main = async () => {
  try {
    if (!fs.existsSync(versionPath)) {
      console.error(chalk.red('Error: El archivo version.json no existe.'));
      process.exit(1); // Salir con código de error
    }

    const data = fs.readFileSync(versionPath, 'utf8');
    let json = JSON.parse(data);
    let versionParts = json.version.split('.').map(Number);

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'versionType',
        message: '¿Qué parte de la versión quieres incrementar?',
        choices: [
          { name: `Versión Major ${chalk.gray('(cambios mayores e importantes, major updates)')}`, value: 'major' },
          { name: `Versión Minor ${chalk.gray('(actualizaciones normales)')}`, value: 'minor' },
          { name: `Parche ${chalk.gray('(parches y hotfixes)')}`, value: 'patch' },
          { name: chalk.red('Cancelar'), value: 'cancel' }  // Opción de cancelar en rojo
        ],
        default: 'patch',  // Opción predeterminada
      }
    ]);

    if (answers.versionType === 'cancel') {
      console.log(chalk.red('Incremento de versión cancelado.'));
      process.exit(1); // Salir con código de error para detener la ejecución
    }

    switch (answers.versionType) {
      case 'major':
        versionParts[0] += 1;
        versionParts[1] = 0;
        versionParts[2] = 0;
        break;
      case 'minor':
        versionParts[1] += 1;
        versionParts[2] = 0;
        break;
      case 'patch':
        versionParts[2] += 1;
        break;
      default:
        console.error(chalk.red('Opción no válida.'));
        process.exit(1); // Salir con código de error
    }

    const dropAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'includeDrop',
        message: `¿Eliminar console logs de la build? ${chalk.gray('(por defecto no se eliminan)')}`,
        default: false,
      }
    ]);

    json.version_previous = json.version;
    json.version = versionParts.join('.');

    // Actualizar los campos de la versión
    const currentDate = new Date().toISOString().split('T')[0];
    const currentDateComplete = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('es-ES', { timeZone: 'Atlantic/Canary' });
    const buildNumber = parseInt(json.compiled_builds, 10) + 1;
    const gitBranch = getGitBranch();  // Obtener la rama de Git
    const gitUser = getGitUser();  // Obtener el usuario de Git

    json.time = currentDateComplete;
    json.time_formatted = formattedDate;
    json.compiled_builds = buildNumber.toString();
    json.user = gitUser;  // Usar el usuario de Git
    json.build = `V${json.version}-T${currentDate}-N${buildNumber}-U${gitUser.charAt(0)}`;
    json.branch = gitBranch;  // Agregar la rama de Git

    fs.writeFileSync(versionPath, JSON.stringify(json, null, 2), 'utf8');
    console.log(chalk.greenBright('\n-> Versión incrementada a:'), chalk.cyan(json.version));
    console.log(chalk.greenBright('-> Datos de build actualizados en version.json'));

    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

    if (dropAnswer.includeDrop) {
      viteConfig = viteConfig.replace(/esbuild:\s*{[^}]*}/, "esbuild: {\n    drop: ['console', 'debugger'],\n  }");
      console.log(chalk.greenBright('-> Se han eliminado los logs de console en'), chalk.cyan('vite.config.js'));
    } else {
      viteConfig = viteConfig.replace(/esbuild:\s*{[^}]*}/, "esbuild: {}");
      console.log(chalk.greenBright('-> No se han eliminado los logs de console en'), chalk.cyan('vite.config.js'));
    }
    fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');

    console.log(chalk.gray('\n---------------------------------------------------------------'));
    console.log(chalk.yellowBright('\nContinuando el proceso de build...'));
  } catch (err) {
    console.error(chalk.red('Error:'), err);
    process.exit(1); // Salir con código de error
  }
};

main();
