<template>
  <div class="page-scroll">
    <div class="pt-20 pl-20">
      <BackButton label="Go back" icon="pi pi-arrow-left" size="large" text/>
    </div>
    <div class="flex flex-col items-center justify-center px-[20%] pb-20 pt-8">
      <h1 class="!text-3xl m-0 bold-900 text-slate-800 dark:text-slate-50">Configuration Page</h1>
      <div class="pb-12">
        <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
          <section class="flex flex-col bg-slate-100 dark:bg-gray-900 rounded-2xl p-6 h-full">
            <div>
              <h4 class="text-xl font-bold m-0 dark:text-slate-50">Options</h4>
            </div>
            <Divider />
            <div class="flex gap-4 pt-2">
              <!-- Theme Selector -->
              <div class="flex flex-col gap-2 pb-4">
                <h4 class="m-0 font-semibold dark:text-slate-300">Theme</h4>
                <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                  <Button v-for="theme in availableThemes()" :key="theme" :label="theme.name"
                    :severity="theme.value == localTheme ? 'primary' : 'secondary'" :icon="theme.icon"
                    :text="theme.value != localTheme" class="w-full px-4" @click="theme.function()" />
                </div>
                <Button label="Toggle Theme" severity="primary" text @click="toggleDarkMode()" />
              </div>
              <!-- Font Size Selector -->
              <div class="flex flex-col gap-2 pb-4">
                <h4 class="m-0 font-semibold dark:text-slate-300">Font Size</h4>
                <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                  <Button label="Small" :severity="localFontSize == 12 ? 'primary' : 'secondary'"
                    :text="localFontSize != 12" class="w-full" @click="setFontSize(12)" />
                  <Button label="Normal" :severity="localFontSize == 14 ? 'primary' : 'secondary'"
                    :text="localFontSize != 14" class="w-full" @click="setFontSize(14)" />
                  <Button label="Big" :severity="localFontSize == 16 ? 'primary' : 'secondary'"
                    :text="localFontSize != 16" class="w-full" @click="setFontSize(16)" />
                  <Button label="Giant" :severity="localFontSize == 18 ? 'primary' : 'secondary'"
                    :text="localFontSize != 18" class="w-full" @click="setFontSize(18)" />
                </div>
              </div>
            </div>
            <div class="flex gap-4 pt-2">
              <!-- Custom Scrollbar Selector -->
              <div class="flex flex-col gap-2 pb-4">
                <h4 class="m-0 font-semibold dark:text-slate-300">Custom Scrollbar</h4>
                <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                  <Button label="Custom" :severity="localCustomScrollbar ? 'primary' : 'secondary'"
                    :text="!localCustomScrollbar" class="w-full" @click="setCustomScrollbar(true)" />
                  <Button label="Native" :severity="!localCustomScrollbar ? 'primary' : 'secondary'"
                    :text="localCustomScrollbar" class="w-full" @click="setCustomScrollbar(false)" />
                </div>
                <Button label="Toggle Custom Scrollbar" severity="primary" text class="w-full" @click="toggleCustomScrollbar()" />
              </div>              
            </div>
          </section>
        </InfoBox>
      </div>
      <h2 class="m-0 text-xl bold-700 text-slate-800 dark:text-slate-50">Components</h2>
      <Divider />
      <div class="flex flex-col items-center gap-6 justify-center">
        <div class="flex flex-wrap justify-center gap-4 ">
          <Button icon="pi pi-check" aria-label="Filter" label="Button" />
          <Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" label="Button" />
          <Button icon="pi pi-search" severity="success" aria-label="Search" label="Button" />
          <Button icon="pi pi-user" severity="info" aria-label="User" label="Button" />
          <Button icon="pi pi-bell" severity="warn" aria-label="Notification" label="Button" />
          <Button icon="pi pi-heart" severity="help" aria-label="Favorite" label="Button" />
          <Button icon="pi pi-times" severity="danger" aria-label="Cancel" label="Button" />
          <Button icon="pi pi-star" severity="contrast" aria-label="Star" label="Button" />
        </div>
        
        <div class="flex flex-wrap justify-center gap-4 ">
          <Button icon="pi pi-check" rounded aria-label="Filter" label="Button" />
          <Button icon="pi pi-bookmark" severity="secondary" rounded aria-label="Bookmark" label="Button" />
          <Button icon="pi pi-search" severity="success" rounded aria-label="Search" label="Button" />
          <Button icon="pi pi-user" severity="info" rounded aria-label="User" label="Button" />
          <Button icon="pi pi-bell" severity="warn" rounded aria-label="Notification" label="Button" />
          <Button icon="pi pi-heart" severity="help" rounded aria-label="Favorite" label="Button" />
          <Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel" label="Button" />
          <Button icon="pi pi-star" severity="contrast" rounded aria-label="Star" label="Button" />
        </div>

        <div class="flex flex-wrap justify-center gap-4 ">
          <Button icon="pi pi-check" rounded variant="outlined" aria-label="Filter" label="Button" /> <Button
            icon="pi pi-bookmark" severity="secondary" rounded variant="outlined" aria-label="Bookmark"
            label="Button" />
          <Button icon="pi pi-search" severity="success" rounded variant="outlined" aria-label="Search"
            label="Button" />
          <Button icon="pi pi-user" severity="info" rounded variant="outlined" aria-label="User" label="Button" />
          <Button icon="pi pi-bell" severity="warn" rounded variant="outlined" aria-label="Notification"
            label="Button" />
          <Button icon="pi pi-heart" severity="help" rounded variant="outlined" aria-label="Favorite" label="Button" />
          <Button icon="pi pi-times" severity="danger" rounded variant="outlined" aria-label="Cancel" label="Button" />
          <Button icon="pi pi-star" severity="contrast" rounded variant="outlined" aria-label="Star" label="Button" />
        </div>

        <div class="flex flex-wrap justify-center gap-4 ">
          <Button icon="pi pi-check" variant="text" raised rounded aria-label="Filter" label="Button" />
          <Button icon="pi pi-bookmark" severity="secondary" variant="text" raised rounded aria-label="Bookmark"
            label="Button" />
          <Button icon="pi pi-search" severity="success" variant="text" raised rounded aria-label="Search"
            label="Button" />
          <Button icon="pi pi-user" severity="info" variant="text" raised rounded aria-label="User" label="Button" />
          <Button icon="pi pi-bell" severity="warn" variant="text" raised rounded aria-label="Notification"
            label="Button" />
          <Button icon="pi pi-heart" severity="help" variant="text" raised rounded aria-label="Favorite"
            label="Button" />
          <Button icon="pi pi-times" severity="danger" variant="text" raised rounded aria-label="Cancel"
            label="Button" />
          <Button icon="pi pi-star" severity="contrast" variant="text" raised rounded aria-label="Star"
            label="Button" />
        </div>

        <div class="flex flex-wrap justify-center gap-4 ">
          <Button icon="pi pi-check" variant="text" rounded aria-label="Filter" label="Button" />
          <Button icon="pi pi-bookmark" severity="secondary" variant="text" rounded aria-label="Bookmark"
            label="Button" />
          <Button icon="pi pi-search" severity="success" variant="text" rounded aria-label="Search" label="Button" />
          <Button icon="pi pi-user" severity="info" variant="text" rounded aria-label="User" label="Button" />
          <Button icon="pi pi-bell" severity="warn" variant="text" rounded aria-label="Notification" label="Button" />
          <Button icon="pi pi-heart" severity="help" variant="text" rounded aria-label="Favorite" label="Button" />
          <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" label="Button" />
          <Button icon="pi pi-star" severity="contrast" variant="text" rounded aria-label="Star" label="Button" />
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <Button icon="pi pi-link" severity="primary" aria-label="Filter" text label="Button" link />
          <Button icon="pi pi-link" severity="secondary" text aria-label="Bookmark" label="Button" link />
          <Button icon="pi pi-link" severity="success" text aria-label="Search" label="Button" link />
          <Button icon="pi pi-link" severity="info" text aria-label="User" label="Button" link />
          <Button icon="pi pi-link" severity="warn" text aria-label="Notification" label="Button" link />
          <Button icon="pi pi-link" severity="help" text aria-label="Favorite" label="Button" link />
          <Button icon="pi pi-link" severity="danger" text aria-label="Cancel" label="Button" link />
          <Button icon="pi pi-link" severity="contrast" text aria-label="Star" label="Button" link />
        </div>
      </div>
      <Divider />
      <div class="flex flex-col gap-8 items-center justify-center">
        <Select optionLabel="name" placeholder="Select a value"></Select>
        <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
        <div class="card flex justify-center">
          <div class="flex gap-4">
            <div v-for="category of categories" :key="category.key" class="flex align-center gap-2">
              <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name"
                :invalid="category.invalid" />
              <label :for="category.key">{{ category.name }}</label>
            </div>
          </div>
        </div>
        <div class="card flex justify-content-center gap-4">
          <ToggleSwitch v-model="checked" />
          <ToggleSwitch v-model="notChecked" :invalid="!notChecked" />
        </div>
        <div>
          <ToggleButton v-model="checked" onLabel="On" offLabel="Off" />
        </div>
        <div class="flex flex-col items-center justify-center gap-2">
          <div class="flex items-center justify-center gap-2">
            <Tag value="Primary"></Tag>
            <Tag severity="secondary" value="Secondary"></Tag>
            <Tag severity="success" value="Success"></Tag>
            <Tag severity="info" value="Info"></Tag>
            <Tag severity="warn" value="Warn"></Tag>
            <Tag severity="danger" value="Danger"></Tag>
            <Tag severity="contrast" value="Contrast"></Tag>
          </div>
          <Tag severity="danger" class="text-base py-4 px-6">{{ '¿Estás seguro de que deseas eliminar el rol?' }}</Tag>
        </div>
        <div class="flex gap-4 justify-center">
          <Message severity="success">Success Message</Message>
          <Message severity="info">Info Message</Message>
          <Message severity="warn">Warn Message</Message>
          <Message severity="error">Error Message</Message>
          <Message severity="secondary">Secondary Message</Message>
          <Message severity="contrast">Contrast Message</Message>
        </div>
        <div class="card flex justify-center">
          <Toast />
          <div class="flex flex-wrap gap-2">
            <Button label="Success" severity="success" @click="showSuccess" />
            <Button label="Info" severity="info" @click="showInfo" />
            <Button label="Warn" severity="warn" @click="showWarn" />
            <Button label="Error" severity="danger" @click="showError" />
            <Button label="Secondary" severity="secondary" @click="showSecondary" />
            <Button label="Contrast" severity="contrast" @click="showContrast" />
          </div>
        </div>
        <div class="card flex flex-wrap justify-center gap-2">
          <Badge value="2"></Badge>
          <Badge value="6" severity="secondary"></Badge>
          <Badge value="8" severity="success"></Badge>
          <Badge value="4" severity="info"></Badge>
          <Badge value="9" severity="warn"></Badge>
          <Badge value="3" severity="danger"></Badge>
          <Badge value="5" severity="contrast"></Badge>
        </div>
        <div class="card w-full">
          <MeterGroup :value="meters" labelPosition="start">
            <template #label="{ value }">
              <div class="flex flex-wrap gap-4">
                <template v-for="val of value">
                  <Card class="flex-1 border border-surface shadow-none">
                    <template #content>
                      <div class="flex justify-between gap-8">
                        <div class="flex flex-col gap-1">
                          <span class="text-surface-500 dark:text-surface-400 text-sm">{{ val.label }}</span>
                          <span class="font-bold text-lg">{{ val.value }}%</span>
                        </div>
                        <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center"
                          :style="{ backgroundColor: `${val.color1}`, color: '#ffffff' }">
                          <i :class="val.icon" />
                        </span>
                      </div>
                    </template>
                  </Card>
                </template>
              </div>
            </template>
            <template #meter="slotProps">
              <span :class="slotProps.class"
                :style="{ background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`, width: slotProps.size }" />
            </template>
            <template #start="{ totalPercent }">
              <div class="flex justify-between mt-4 mb-2 relative">
                <span>Storage</span>
                <span :style="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
                <span class="font-medium">1TB</span>
              </div>
            </template>
            <template #end>
              <div class="flex justify-between mt-4">
                <Button label="Manage Storage" outlined size="small" />
                <Button label="Update Plan" size="small" />
              </div>
            </template>
          </MeterGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { toggleDarkMode, availableThemes, setFontSize, toggleCustomScrollbar, setCustomScrollbar } from '@/utilities/preferencesUtils';
import InfoBox from '@/components/InfoBox.vue';

import { useToast } from "primevue/usetoast";
import BackButton from '@/components/BackButton.vue';

// Configuration preferences
const store = useStore();
const localTheme = computed(() => store.getters.getPreferences.themeMode);
const localFontSize = computed(() => store.getters.getPreferences.fontSize);

const localCustomScrollbar = computed(() => store.getters.getPreferences.customScrollbar);

// =========================================================== //
// =========================================================== //
// Checkboxes
const categories = ref([
  { name: "Accounting", key: "A", invalid: false },
  { name: "Marketing", key: "M", invalid: false },
  { name: "Production", key: "P", invalid: true },
  { name: "Research", key: "R", invalid: true }
]);
const selectedCategories = ref(['Marketing', 'Production']);

// ToggleSwitch
// ToggleButton
const checked = ref(true);
const notChecked = ref(false);

// Toast
const toast = useToast();
const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
};

const showInfo = () => {
  toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
};

const showWarn = () => {
  toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000 });
};

const showError = () => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
};

const showSecondary = () => {
  toast.add({ severity: 'secondary', summary: 'Secondary Message', detail: 'Message Content', life: 3000 });
};

const showContrast = () => {
  toast.add({ severity: 'contrast', summary: 'Contrast Message', detail: 'Message Content', life: 3000 });
};

// MeterGroup
const meters = ref([
  { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
  { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
  { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
  { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
]);
</script>