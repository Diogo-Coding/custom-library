// /* - VARIOS - */
// console.log('%c [VARIOS] %c Mensaje variado', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #444; color: #bada55; padding: 2px; border-radius:2px;');

// /* - ERROR - */
// console.log('%c [ERROR] %c ¡Algo salió mal!', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #ff4444; color: #ffffff; padding: 2px; border-radius: 2px;');

// /* - INFO - */
// console.log('%c [INFO] %c Proceso completado con éxito.', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #2b9ccf4d; color: #ffffff; padding: 2px; border-radius: 2px;');

// /* - WARNING - */
// console.log('%c [WARNING] %c La configuración no está optimizada.', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #f6a935; color: #ffffff; padding: 2px; border-radius: 2px;');

// /* - SUCCESS - */
// console.log('%c [SUCCESS] %c ¡Datos cargados correctamente!', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #4CAF50; color: #ffffff; padding: 2px; border-radius: 2px;');

// /* - DEPURACIÓN - */
// console.log('%c [DEPURACIÓN] %c Variable X = 100.', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #9c27b0; color: #ffffff; padding: 2px; border-radius: 2px;');

// /* - PROCESANDO - */
// console.log('%c [PROCESO] %c Conectando al servidor...', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #00695c; color: #fff; padding: 2px; border-radius: 2px;');


function customConsoleLog(type, text, content) {
  let styleType, styleContent;

  switch(type.toUpperCase()) {
      case 'VARIOS':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #444; color: #bada55; padding: 2px; border-radius: 2px;';
          break;
      case 'ERROR':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #ff4444; color: #ffffff; padding: 2px; border-radius: 2px;';
          break;
      case 'INFO':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #2b9ccf; color: #ffffff; padding: 2px; border-radius: 2px;';
          break;
      case 'WARNING':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #f6a935; color: #ffffff; padding: 2px; border-radius: 2px;';
          break;
      case 'SUCCESS':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #4CAF50; color: #ffffff; padding: 2px; border-radius: 2px;';
          break;
      case 'DEPURACIÓN':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #9c27b0; color: #ffffff; padding: 2px; border-radius: 2px;';
          break;
      case 'PROCESO':
          styleType = 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;';
          styleContent = 'background: #00695c; color: #fff; padding: 2px; border-radius: 2px;';
          break;
      default:
          console.error('Tipo desconocido');
          return;
  }

  console.log(`%c [${type.toUpperCase()}] %c ${text} `, styleType, styleContent, content ? content : '');
}

export const customLog = (type, text, content) => customConsoleLog(type, text, content);