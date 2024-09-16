<template>
  <div class="loginPage relative">
    <BlockUI :blocked="isLoading">
      <div class="content-wrapper relative">
        <div class="content h-[100vh] w-[100vw] rounded-none max-w-full sm:max-w-[450px] sm:rounded-[12px] sm:h-full sm:w-full" :class="isLoading ? 'isLoading' : ''">
          <div style="height: 6px">
            <ProgressBar mode="indeterminate" class="b-spring" style="height: 6px" v-if="isLoading"></ProgressBar>
            <ProgressBar :value="100" class="b-spring" style="height: 6px" :showValue="false" v-else></ProgressBar>
          </div>
          <section class="login-form flex flex-col">
            <div class="form-header flex flex-col items-center text-center gap-2 pt-5 pb-6">
              <div class="select-none">
                <Image :src="logotipoSpring" alt="Spring Hotels Group" width="100" />
              </div>
              <div>
                <h1 class="is-title text-2xl font-bold pt-4">Control de Transfers</h1>
                <span class="is-note text-wrap">Servicio control remoto de transfers para Spring Hotels Group</span>
              </div>
            </div>
            <div class="py-1">
              <Transition name="fade" mode="out-in">
                <div class="notification" v-if="errorLogIn">
                  <Message severity="error">{{ errorMessage }}</Message>
                </div>
              </Transition>
            </div>
            <form class="form-content flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="username" class="font-medium is-label">Nombre de usuario</label>
                <InputText id="username" v-model="username" placeholder="Introduce tu usuario" @keyup.enter="logIn()" autocomplete="username"/>
              </div>
              <div class="flex flex-col gap-2">
                <label for="password" class="font-medium is-label">Contraseña</label>
                <InputText type="password" class="w-f" id="password" :feedback="false" v-model="password" placeholder="Introduce tu contraseña" @keyup.enter="logIn()" autocomplete="current-password"/>
              </div>
              <div class="form-buttons flex justify-end">
                <Button class="btn-spring w-full" label="Entrar" :raised="checkForm()" :disabled="!checkForm()" @click="logIn()"/>
              </div>
            </form>
            <!-- <div class="flex items-center justify-center text-sm py-4 ">
              <a href="/forgot-password" class="font-semibold text-blue-600 hover:text-blue-500">¿Se te ha olvidado la contraseña?</a>
            </div> -->
            <div class="w-full text-center pt-6">
              <span class="is-note text-wrap">©Spring Hotels Group - 2024</span>
            </div>
          </section>
        </div>
      </div>
    </BlockUI>
    <Transition name="fade" mode="out-in">
      <div class="loading" v-if="isLoading">
        <!-- <i class="pi pi-spin pi-spinner" style="font-size: 30px"></i> -->
        <font-awesome-icon icon="circle-notch" spin size="2xl"/>
      </div>
    </Transition>
  </div>
</template>

<script>
import logotipoSpring from '@/assets/images/Spring_Logo_White_Small_With_Title.png'

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { URL_BACK } from '@/config/config.js';
import store from '@/store';

export default {
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)

    const date = ref()
    const username = ref(null)
    const password = ref(null)
    const errorMessage = ref(null)
    const errorLogIn = ref(false)

    function checkForm () {
      if (username.value && password.value) return true
      else false
    }

    function logIn () {
      if (checkForm()) {
        errorLogIn.value = false
        isLoading.value = true
        let params = new URLSearchParams();
        params.append("username", username.value);
        params.append("password", password.value);
        const options = {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          redirect: 'follow',
          body: params,
        }
  
        fetch(URL_BACK + '/users/login', options)
        .then(res => {
          // Controlar respuesta
          if (res.ok) return res.json()
          else {
            setTimeout(() => {
              errorMessage.value = 'Usuario o contraseña incorrectos.'
              errorLogIn.value = true
            }, 200)
            return
          }
        })
        .then(data => {
          if (data) {
            console.log(data)
            store.dispatch('setUser', data.user)
            store.dispatch('setIsLoggedIn', true)
            store.dispatch('setHotel', data.user.hotel)
            store.dispatch('setToken', data.token)
            router.push({ name: 'Main Page' })
          }
          setTimeout(() => {
            isLoading.value = false
          }, 200)
        })
        .catch(error => {
          setTimeout(() => {
            isLoading.value = false
          }, 200)
          errorMessage.value = 'Error al realizar la llamada, intentelo de nuevo.'
          errorLogIn.value = true
          console.log(error)
        })
      }
    }

    return {
      logIn,
      date,
      username,
      password,
      logotipoSpring,
      isLoading,
      checkForm,
      errorMessage,
      errorLogIn,
    }
  }
}
</script>

<style scoped>
.loginPage {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content {
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  min-width: 15%;
  transition: box-shadow 0.3s ease-in-out;
}
.login-form {
  padding: 36px;
}
.content.isLoading {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
h1 {
  margin: 0;
  margin-bottom: 4px;
}
.loading {
  position: absolute;
  z-index: 999999 !important;
}
.p-blockui {
  border-radius: 12px;
}
.p-progressbar {
  border-radius: 0;
}

/* Responsive at sm size */
@media (min-width: 768px) {
  .p-progressbar {
    border-radius: 6px 6px 0 0;
  }
}
</style>
