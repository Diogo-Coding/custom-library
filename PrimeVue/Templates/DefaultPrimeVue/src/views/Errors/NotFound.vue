<template>
  <div class="page">
    <div class="flex justify-center items-center h-full">
      <div class="h-full w-full text-center flex flex-col justify-center items-center gap-10">
        <div class="flex flex-col gap-2">
          <div>
            <label class="is-title text-3xl font-bold">
              Not found 404
            </label>
          </div>
          <div>
            <label class="is-label">
              Pagina no encontrada o no disponible
            </label>
          </div>
        </div>
        <div>
          <Button severity="secondary" label="Volver" icon="pi pi-arrow-left" @click="goBack()"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: [],
  emits: [],
  components: {
  },
  setup(props, ctx) {
    const router = useRouter()

    function goBack () {
      router.back()
    }
    
    return {
      goBack
    }
  }
}
</script>

<style scoped>

</style>