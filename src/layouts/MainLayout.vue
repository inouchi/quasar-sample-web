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

          <q-item clickable v-ripple @click="showLogoutDialog = true">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>ログアウト</q-item-section>
            <q-tooltip
              anchor="center right"
              self="center left"
              class="text-body2"
              transition-duration="0"
              :offset="[10, 10]"
              >ログアウト
            </q-tooltip>
          </q-item>

          <q-item clickable v-ripple @click="showHelpDialog = true">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>Web情報</q-item-section>
            <q-tooltip
              anchor="center right"
              self="center left"
              class="text-body2"
              transition-duration="0"
              :offset="[10, 10]"
              >Web情報
            </q-tooltip>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="showLogoutDialog">
      <q-card style="width: 400px">
        <q-toolbar class="bg-blue-9">
          <q-icon name="logout" size="sm" color="white" />
          <q-toolbar-title class="text-white">ログアウト</q-toolbar-title>
          <q-space />
          <q-btn icon="close" color="white" flat round dense v-close-popup />
        </q-toolbar>
        <q-card-section class="text-center text-subtitle1 q-pt-lg">
          ログアウトしますか？
        </q-card-section>
        <q-card-actions vertical class="q-px-lg">
          <q-btn
            unelevated
            rounded
            label="OK"
            color="primary"
            class="q-mb-md"
            @click="logout"
          />
          <q-btn
            outline
            unelevated
            rounded
            label="キャンセル"
            color="primary"
            v-close-popup
            class="q-my-md"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showHelpDialog">
      <q-card style="width: 400px">
        <q-toolbar class="bg-blue-9">
          <q-icon name="info" size="sm" color="white" />
          <q-toolbar-title class="text-white">Web情報</q-toolbar-title>
          <q-space />
          <q-btn flat round dense color="white" icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="text-center text-subtitle1 q-pt-md">
          <div>App Name：Quasar Sample Web (ver. {{ version }})</div>
          <div>
            Distribution：<a
              target="_blank"
              href="https://github.com/inouchi/quasar-sample-web"
              >Link to GitHub Repository
            </a>
          </div>

          <div v-if="getYear() === 2022">© {{ getYear() }} {{ author }}</div>
          <div v-else class="q-mt-sm q-mb-xs">
            © 2022-{{ getYear() }} {{ author }}
          </div>
        </q-card-section>

        <q-card-actions vertical class="q-px-lg q-pt-none q-pb-lg">
          <q-btn
            outline
            unelevated
            rounded
            label="閉じる"
            v-close-popup
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import { useQuasar, QSpinnerIos } from "quasar";
import { useRouter } from "vue-router";
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
      {
        label: "タスク登録",
        icon: "post_add",
        to: "/admin/register-task",
      },
      {
        label: "パスワード変更",
        icon: "settings",
        to: "/admin/change-password",
      },
    ]);
    const showLogoutDialog = ref(false);
    const showHelpDialog = ref(false);
    const productName = ref(packageInfo.productName);
    const version = ref(packageInfo.version);
    const author = ref(packageInfo.author);
    const $q = useQuasar();
    const router = useRouter();

    const getYear = () => {
      return new Date().getFullYear();
    };

    const logout = async () => {
      $q.loading.show({ spinner: QSpinnerIos });
      // TODO:ログアウト用のAPIを呼び出す
      await new Promise((resolve) => setTimeout(resolve, 2000));
      $q.loading.hide();
      router.push("/");
    };

    return {
      leftDrawerOpen,
      miniState,
      menuList,
      showLogoutDialog,
      showHelpDialog,
      productName,
      version,
      author,
      getYear,
      logout,
    };
  },
});
</script>
