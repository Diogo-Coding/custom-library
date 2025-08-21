<template>
  <div class="">
    <div class="flex flex-col gap-4">
      <div>
        <label class="is-note">Full Path:</label>
        <h2 class="!m-0 text-3xl font-extrabold">- {{ $route.fullPath }}</h2>
      </div>
      <div>
        <label class="is-note">Route Name:</label>
        <h2 class="!m-0 text-3xl font-extrabold">- {{ $route.name }}</h2>
      </div>
    </div>
    <div>
      <Divider />
    </div>
    <div class="flex flex-col gap-2">
      <div class="mb-4">
        <BackButton text label="Go Back" severity="secondary" icon="pi pi-arrow-left" />
      </div>
      <div>
        <h4
          class="font-semibold underline underline-offset-4 decoration-slate-400 decoration-dashed leading-normal mb-2"
        >
          Available Routes
        </h4>
      </div>
      <ul class="flex flex-col gap-2">
        <li>
          <div>
            <RouterLink to="/not-found" :class="{ disabled: $route.path == '/not-found' }">
              <Button label="Not Found" severity="secondary" icon="pi pi-arrow-right" icon-pos="right" />
            </RouterLink>
          </div>
        </li>
        <li>
          <div>
            <RouterLink
              to="/errors/something-went-wrong"
              :class="{ disabled: $route.path == '/errors/something-went-wrong' }"
            >
              <Button label="Something went wrong" severity="secondary" icon="pi pi-arrow-right" icon-pos="right" />
            </RouterLink>
          </div>
        </li>
        <li>
          <div>
            <RouterLink to="/dev/configuration" :class="{ disabled: $route.path == '/dev/configuration' }">
              <Button label="Configuration" severity="secondary" icon="pi pi-arrow-right" icon-pos="right" />
            </RouterLink>
          </div>
        </li>
        <li>
          <div>
            <RouterLink to="/templates/page" :class="{ disabled: $route.path == '/templates/page' }">
              <Button
                label="Other Page from Templates Router"
                severity="secondary"
                icon="pi pi-arrow-right"
                icon-pos="right"
              />
            </RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/Custom/BackButton.vue'
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  cursor: none;
}
</style>
