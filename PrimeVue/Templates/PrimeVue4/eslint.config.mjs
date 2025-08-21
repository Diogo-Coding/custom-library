import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  {
    ignores: ['**/node_modules', '**/dist']
  },
  js.configs.recommended, // reglas básicas JS
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      },
      globals: globals.browser
    },
    plugins: {
      vue,
      prettier
    },
    rules: {
      // Reglas de Vue (escritas directamente aquí)
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',

      // Reglas JS típicas
      'no-unused-vars': 'warn',
      eqeqeq: 'warn',

      // Reglas de Prettier
      'prettier/prettier': 'error'
    }
  }
]