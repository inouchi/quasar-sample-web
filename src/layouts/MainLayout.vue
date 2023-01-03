<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          dense
          icon="menu"
        />
        <img
          alt="Quasar Logo"
          src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
          class="q-ml-md"
          style="width: 30px; height: 30px"
        />
        <q-toolbar-title>{{ productName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="true"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-2"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <div v-for="menu in menuList" :key="menu.label">
            <q-item clickable v-ripple :to="menu.to">
              <q-item-section avatar>
                <q-icon :name="menu.icon" />
              </q-item-section>
              <q-item-section>{{ menu.label }}</q-item-section>
              <q-tooltip
                anchor="center right"
                self="center left"
                class="text-body2"
                transition-duration="0"
                :offset="[10, 10]"
                >{{ menu.label }}
              </q-tooltip>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <header-layout />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import packageInfo from "../../package.json";
import HeaderLayout from "./HeaderLayout.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    HeaderLayout,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const miniState = ref(true);
    const menuList = ref([
      {
        label: "ホーム",
        icon: "home",
        to: "/admin/home",
      },
    ]);
    const productName = ref(packageInfo.productName);

    return {
      leftDrawerOpen,
      miniState,
      menuList,
      productName,
    };
  },
});
</script>
