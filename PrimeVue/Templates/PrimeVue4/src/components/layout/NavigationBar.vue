<template>
  <div
    class="header flex flex-col transition-all duration-300"
    :class="[
      animatedOnScroll
        ? scrolled
          ? 'backdrop-blur-sm dark:backdrop-blur-md bg-surface-100/60 dark:bg-surface-950/60 ring-1 ring-surface-300 dark:ring-surface-700'
          : 'bg-transparent border-b-0'
        : 'bg-white ring-1 ring-surface-300 dark:ring-surface-700 dark:bg-surface-950',
      !animatedOnScroll && borderDivider ? 'ring-1 ring-surface-300 dark:ring-surface-700' : ''
    ]"
  >
    <div class="flex items-center justify-between pr-10 h-full">
      <div
        class="flex items-center gap-x-3 h-full hover:ring-1 hover:ring-surface-300 dark:hover:ring-surface-700 transition-shadow duration-300"
        :class="[
          animatedOnScroll ? 'rounded-br-lg hover:shadow-lg dark:hover:shadow-surface-800/50' : '',
          animatedOnScroll && scrolled ? '!rounded-none' : ''
        ]"
      >
        <div class="flex items-center gap-3 h-full py-[16px] pl-4">
          <Button
            text
            icon="pi pi-bars"
            size="large"
            iconClass="text-xl"
            severity="secondary"
            v-tooltip.right="{
              value: preferencesStore.lateralMenu ? 'Ocultar menú lateral' : 'Abrir menú lateral',
              autoHide: true,
              showDelay: 500
            }"
            class="dark:text-white"
            @click="toggleLateralMenu()"
          ></Button>
        </div>
        <RouterLink to="/templates" class="flex items-center gap-3 h-full py-[16px] pr-[32px] spring-title">
          <div class="h-full">
            <LogoSVG alt="Small Logo" class="select-none h-full c-darkspring dark:!text-white" />
          </div>
          <!-- No mostrar el nombre del proyecto cuando es tamaño movil o tablet -->
          <label class="c-spring dark:!text-surface-200 bold-700 text-sm sm:text-base cursor-pointer py-2 text-nowrap">
            <Transition name="fade" mode="out-in">
              <div :key="route?.meta?.title">
                {{ route.meta.title }}
              </div>
            </Transition>
          </label>
        </RouterLink>
      </div>
      <div class="flex justify-center items-center gap-6 h-full">
        <div class="text-sm font-medium text-surface-800 dark:text-surface-300 flex items-center gap-2">
          <i class="pi pi-calendar"></i>
          <LiveDateTime
            locale="es-ES"
            :timezone="getTimezoneClient()"
            :options="{
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }"
          />
        </div>
        <div class="text-sm font-medium text-surface-800 dark:text-surface-300 flex items-center gap-2">
          <i class="pi pi-clock"></i>
          <LiveDateTime
            locale="es-ES"
            :timezone="getTimezoneClient()"
            :options="{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }"
          />
        </div>
        <div class="py-4 px-0 h-full">
          <Divider layout="vertical" class="m-0" />
        </div>
        <div
          class="text-sm flex items-center justify-center gap-2 pl-2 text-surface-800 dark:text-surface-100 font-medium"
        >
          <i class="pi pi-user" />
          <div>
            <span>Name</span>
            <span>Surname</span>
          </div>
        </div>
        <div class="flex gap-1">
          <Button
            type="button"
            severity="secondary"
            icon="pi pi-ellipsis-v"
            aria-haspopup="true"
            aria-controls="overlay_tmenu"
            @click="toggle"
          />
          <Menu ref="menu" :model="items" :popup="true">
            <template #start>
              <div class="flex flex-col p-3">
                <div class="capitalize">
                  <span class="font-bold">Name</span>
                  <span class="font-bold">Surname</span>
                </div>
              </div>
            </template>
            <template #item="{ item, props }">
              <div class="flex items-center gap-1" :class="[item.first ? 'mt-2' : '', item.last ? 'mb-2' : '']">
                <Button
                  text
                  severity="secondary"
                  class="w-full flex pl-4 items-center"
                  :class="[`text-${item.color}`]"
                  v-bind="props.action"
                >
                  <div class="flex items-center w-full">
                    <span :class="[`text-${item.color}`, item.icon]" />
                    <span class="ml-2 font-medium" :class="[`text-${item.color}`]">{{ item.label }}</span>
                  </div>
                  <i v-if="item.is_link" class="pi pi-external-link text-sm" />
                </Button>
              </div>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePreferencesStore } from '@/stores/preferences'
import getTimezoneClient from '@/utilities/getTimezoneClient'
import LogoSVG from '@/assets/icons/logo.svg'

const { borderDivider, animatedOnScroll, scrollThreshold, scrollTarget } = defineProps({
  borderDivider: { type: Boolean, default: false },
  animatedOnScroll: { type: Boolean, default: false },
  scrollThreshold: { type: Number, default: 8 },
  scrollTarget: { type: String, default: '' }
})

const scrolled = ref(false)
let _scrollHandler = null
let _scrollEl = null

onMounted(() => {
  const selector = (scrollTarget || '').trim()
  _scrollEl = selector ? document.querySelector(selector) : window
  _scrollHandler = () => {
    const y = _scrollEl === window ? window.scrollY || window.pageYOffset || 0 : _scrollEl.scrollTop
    scrolled.value = y > scrollThreshold
  }
  _scrollHandler()
  const target = _scrollEl
  if (target) target.addEventListener('scroll', _scrollHandler, { passive: true })
})

onUnmounted(() => {
  const target = _scrollEl || window
  if (target && _scrollHandler) target.removeEventListener('scroll', _scrollHandler)
})

const authStore = useAuthStore()
const preferencesStore = usePreferencesStore()

const router = useRouter()
const route = useRoute()
const menu = ref()

const toggleLateralMenu = () => {
  preferencesStore.lateralMenu = !preferencesStore.lateralMenu
}
const toggle = (event) => {
  menu.value.toggle(event)
}

const items = ref([
  {
    separator: true
  },
  {
    first: true,
    last: false,
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/main/home')
    }
  },
  {
    first: false,
    last: false,
    label: 'Mi perfil',
    icon: 'pi pi-user',
    command: () => {
      router.push({ path: '/admin/users', query: { id: authStore.user.id } })
    }
  },
  {
    first: false,
    last: true,
    label: 'Configuración',
    icon: 'pi pi-cog',
    command: () => {
      router.push('/main/preferences')
    }
  },
  {
    separator: true
  },
  {
    first: true,
    last: false,
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    is_link: false,
    command: async () => {
      await logOutSession()
    },
    severity: 'danger',
    color: 'red-500'
  }
])

async function logOutSession() {
  //
}
</script>

<style scoped>
.header {
  height: var(--nav-bar-height);
  min-height: var(--nav-bar-height);
}
.user-detail-name {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 700;
}
.spring-title {
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition: background-color 0.1s ease-in-out;
}
</style>
