This utility is a group of functions that help you to keep the scroll position of a component when it is not visible.

## Installation

Move `composables` folder to the root of your project `src` folder.

## Usage

1. Import the `useKeepAliveScroll` function in your component and pass the `ref` of the main element that has scroll you want keep for that route:

  ```vue
  <script setup>
  import { useKeepAliveScroll } from '@/composables/useKeepAliveScroll.js'
  const scrollable = ref(null)
  useKeepAliveScroll(scrollable)
  </script>
  ```

  Then, in your template, add the `ref` to the component:

  ```vue
  <template>
    <div class="my-componente-view" ref="scrollable">
      <!-- Your content here -->
  ```

2. Move `sessionId` to the utilities folder you have.

3. Add the preferenceUtils from `preferencesUtils.js` to your `utilities/preferencesUtils.js` file