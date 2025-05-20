<template>
  <main>
    <div>
      <div class="content-wrapper">
        <div class="content">
          <div class="text-icon">
            <h1 color="spring">
              😔
            </h1>
          </div>
          <div class="text-title">
            <h1 color="spring">
              Ops, seems there was a problem.
            </h1>
          </div>
          <div class="text-message">
            <label>
              The page you tried to access is not available or does not exist. Most likely due to an application update
            </label>
          </div>
          <div class="text-message">
            <label class="dark:text-slate-400 text-slate-600">
              Reload page and try again
            </label>
          </div>
          <div class="divider">
            <div class="bar-small"></div>
          </div>
          <div class="buttons-go-back">
            <div class="button-wrapper">
              <Button severity="secondary" label="Go back" icon="pi pi-arrow-left" @click="goBack()"></Button>
            </div>
            <div class="button-wrapper">
              <a href="/">
                <Button severity="secondary" label="Go Home Page" icon="pi pi-home"></Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function goBack () {
  // go redirige hacia delante o atras la cantidad de rutas que se pase en el parametro, pero a su vez recarga la pagina, lo que hace que se solicite los archivos de nuevo
  router.go(-1)
}
</script>

<style scoped>
main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
}
.content-wrapper {
  max-height: 100vh;
  min-height: 100vh;
  height: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.content {
  max-width: 600px;
  width: 100%;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.text-icon h1 {
  font-size: 5rem;
  margin: 0;
}
.text-title h1 {
  font-size: 2rem;
  font-weight: 700;
}
.buttons-go-back {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.button-wrapper {
  width: 100%;
  height: 100%;
}
.button-wrapper button {
  width: 100%;
}
.divider {
  width: 100%;
  margin-block: 20px;
}

@media screen and (max-width: 576px) {
  .buttons-go-back {
    flex-direction: column;
  }
}
</style>