/**
 * Custom console.log with styled label and title.
 * @param {string} type - One of others, error, info, warning, success, depuration, processing
 * @param {string} text - Title/text to display
 * @param {*} content - Optional content (object, array, error, etc.)
 */
function customLog(type, text, content) {
  const lower = type.toLowerCase()
  const upper = lower.toUpperCase()
  let styleLabel = ''
  let styleTitle = ''

  switch (lower) {
    case 'others':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #444; color: #bada55; padding: 2px; border-radius: 2px;'
      break
    case 'error':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #ff4444; color: #ffffff; padding: 2px; border-radius: 2px;'
      break
    case 'info':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #2b9ccf4d; color: #ffffff; padding: 2px; border-radius: 2px;'
      break
    case 'warning':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #f6a935; color: #ffffff; padding: 2px; border-radius: 2px;'
      break
    case 'success':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #4CAF50; color: #ffffff; padding: 2px; border-radius: 2px;'
      break
    case 'depuration':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #9c27b0; color: #ffffff; padding: 2px; border-radius: 2px;'
      break
    case 'processing':
      styleLabel =
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;'
      styleTitle = 'background: #00695c; color: #fff; padding: 2px; border-radius: 2px;'
      break
    default:
      console.error(
        `%c [${upper}] %c Unknown log type`,
        'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;',
        'background: #ff4444; color: #ffffff; padding: 2px; border-radius: 2px;'
      )
      return
  }

  // Label with trailing space after text
  const label = `%c [${upper}] %c ${text} `

  console.log(label, styleLabel, styleTitle, content !== undefined ? content : '')
}

// Export utility as styledLog
export const styledLog = customLog
