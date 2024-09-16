<template>
  <main class="content flex flex-col h-full overflow-auto">
    <div class="grow">
      <section class="welcome-message p-5 pl-10">
        <h2 class="text-xl sm:text-3xl is-label m-0 mb-2 mt-5 c-spring">¡Bienvenido, {{ getUserNames() }}!</h2>
        <div class="text-sm sm:text-base is-label flex items-center gap-2">
          <i class="pi pi-building text-sm sm:text-base"></i>
          <span>{{ getHotel() }}</span>
        </div>
      </section>
      <section class="px-10">
        <div class="containers-wrapper">
          <div class="container-title">
            <h2 class="text-xl py-4 m-0 text-gray-800">Navegación rapida</h2>
          </div>
          <div class="containers grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:pr-20">
            <div v-for="menu, index in fastNavigationMenus" :key="index" class="disabled container cursor-pointer rounded shadow-md transition-colors relative" :class="menu.disabled ? 'opacity-50' : 'hover:bg-[#e6eaee]'">
              <RouterLink :to="menu.dire" v-if="!menu.disabled">
                <div class="flex flex-col justify-center text-center items-center gap-2 p-10">
                  <div class="title text-3xl bold">{{ menu.title }}</div>
                  <div class="description max-w-80 text-wrap">{{ menu.description }}</div>
                  <div class="icon pt-5">
                    <span :class="menu.icon" class="text-6xl"></span>
                  </div>
                </div>
              </RouterLink>
              <div v-else>
                <div class="flex flex-col justify-center text-center items-center gap-2 p-10">
                  <div class="title text-3xl bold">{{ menu.title }}</div>
                  <div class="description max-w-80 text-wrap">{{ menu.description }}</div>
                  <div class="icon pt-5">
                    <span :class="menu.icon" class="text-6xl"></span>
                  </div>
                </div>
                <div v-if="menu.disabled" class="absolute inset-0 cursor-not-allowed" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="footer flex items-center p-10">
      <label class="is-note">
        <a href="https://www.springhoteles.com/" target="_blank">
          <span class="cursor-pointer">@Spring Hotels Group {{ new Date().getFullYear() }}</span>
        </a>
        <RouterLink to="/version.json" target="_blank">
          <span class="cursor-pointer"> v{{ version }}</span>
        </RouterLink>
      </label>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const version = ref(null)

// Leer la version del archivo version.json de /public
fetch('/version.json')
.then(response => response.json())
.then(data => {
  version.value = data.version
})

function getHotel() {
  if (store.getters.getHotel == null || store.getters.getHotel == 0) {
    return 'Todos los hoteles'
  } else {
    return 'Hotel ' + store.getters.getHotel
  }
}

function visitSpringHotels() {
  window.open('https://www.springhoteles.com/', '_blank')
}

function openVersion() {
  window.open('/version.json', '_blank')
}

const fastNavigationMenus = ref([
  {
    title: 'Historial',
    description: 'Realiza busquedas y consulta el historial de transfers realizados',
    icon: 'pi pi-search',
    dire: '/main/history',
  },
  // {
  //   title: 'Modificar',
  //   description: 'Busca, obten y modifica los datos de un registro existente',
  //   icon: 'pi pi-pencil',
  //   dire: '/main/history/view',
  //   disabled: false,
  // },
  {
    title: 'Insertar',
    description: 'Realiza nuevas inserciones añadiendo nuevos registros',
    icon: 'pi pi-plus',
    dire: '/main/history/add',
    disabled: false,
  },
  {
    title: 'Configuración',
    description: 'Configura las preferencias de la pagina a tu gusto',
    icon: 'pi pi-cog',
    dire: '/preferences',
    disabled: false,
  },
])

function getUserNames() {
  let user = store.getters.getUser
  if (user) {
    if (user.name && user.surname) {
      return user.name + ' ' + user.surname
    } else {
      return user.username
    }
  }
}

function orderNavigationMenus() {
  fastNavigationMenus.value.sort((a, b) => {
    if (a.disabled && !b.disabled) return 1
    else if (!a.disabled && b.disabled) return -1
    else return 0
  })
}

function removeDisabledMenus() {
  fastNavigationMenus.value = fastNavigationMenus.value.filter(menu => !menu.disabled)
}

onBeforeMount(() => {
  orderNavigationMenus() // Ordena los menus segun si están deshabilitados
  removeDisabledMenus() // Quita los menus deshabilitados
})

</script>

<style scoped>
.container {
  color: var(--spring) !important;
  background: #f1f5f9;
}
.content {
  border: 1px solid #e2e8f0;
  border-width: 1px 0 0 0;
  background: white;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>