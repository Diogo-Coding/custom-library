<template>
  <div>
    <div>
      <div class="flex gap-8">
        <div class="w-full flex flex-col gap-4 p-10">
          <RouterLinks />
          <div class="">
            <div class="card-box w-full">
              <div>
                <h1 class="!m-0 text-xl font-semibold dark:text-surface-300">Botones</h1>
                <span>
                  <span class="text-lg dark:text-surface-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </span>
              </div>
              <Divider />
              <div class="flex flex-wrap gap-4">
                <Button severity="secondary" label="Botón secundario" />
                <Button severity="success" label="Botón éxito" />
                <Button severity="info" label="Botón info" />
                <Button severity="warn" label="Botón advertencia" />
                <Button severity="danger" label="Botón peligro" />
                <Button severity="help" label="Botón ayuda" />
                <Button label="Botón principal" />
              </div>
            </div>
          </div>
          <div class="">
            <div class="card-box w-full">
              <ConfigurationPage />
            </div>
          </div>
        </div>
        <div class="">
          <div class="sticky-page overflow-auto p-10">
            <MobilePreview
              url="https://hello.springhoteles.com/"
              layout="mobile"
              class="shadow-lg"
              :show-close-icon="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobilePreview from '@/components/Custom/MobilePreview.vue'
import RouterLinks from '@/components/Testing/RouterLinks.vue'
</script>

<style scoped>
.sticky-page {
  position: sticky;
  top: 0;
  height: calc(100svh - var(--nav-bar-height));
  top: calc(var(--nav-bar-height));
}
</style>
