<!-- Information:
  Template page for transitioned views, 
  this example, every page from "/main" route will be transitioned and managed from here.
  You can copy this view and use it for another route pointing for another page.
  Also lets you customize styles for expecific section pages.
-->
<template>
  <div class="main-page bg-white dark:bg-gray-900"> <!-- /main will have the background color different than the rest of the pages -->
    <div class="main-container">
      <router-view v-slot="{ Component, route }">
        <Transition :name="route.meta.transition || 'fade'" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.main-page {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  overflow: hidden;
}
.main-container {
  overflow-y: hidden;
  height: 100vh;
}
</style>