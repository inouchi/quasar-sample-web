<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar
        :class="
          isMobile() ? 'text-white bg-primary' : 'text-black bg-blue-grey-1'
        "
      >
        <q-btn
          v-if="isMobile()"
          flat
          @click="leftDrawerOpen = true"
          round
          dense
          icon="menu"
        />
        <img
          alt="Quasar Logo"
          src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
          :class="isMobile() ? 'q-ml-sm' : ''"
          style="width: 30px; height: 30px"
        />
        <q-toolbar-title>{{ productName }}</q-toolbar-title>
      </q-toolbar>
      <q-separator class="bg-blue-grey-2" size="2px" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      :width="200"
      :breakpoint="leftDrawerBreakpoint"
      class="bg-primary"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list>
          <q-item
            clickable
            @click="
              leftDrawerOpen = isMobile() ? !leftDrawerOpen : true;
              updateMiniState();
              updateLeftDrawerOpenCloseButtonIcon();
            "
            @mouseenter="updateLeftDrawerOpenCloseButtonIcon()"
            @mouseleave="leftDrawerOpenCloseButtonIcon = 'menu'"
            class="no-hover"
          >
            <q-item-section></q-item-section>
            <q-item-section avatar :class="miniState ? '' : 'q-ml-auto'">
              <q-icon
                :name="
                  isMobile() ? 'arrow_back' : leftDrawerOpenCloseButtonIcon
                "
                color="white"
              />
            </q-item-section>
          </q-item>
          <div
            v-for="menu in menuList"
            :key="menu.label"
            class="text-weight-bolder"
            @click="
              menuList.forEach((v) => (v.selected = false));
              menu.selected = true;
            "
          >
            <q-item
              clickable
              :to="menu.to"
              active-class="text-black bg-white"
              class="text-black no-hover"
            >
              <q-item-section avatar>
                <q-icon
                  :name="menu.icon"
                  :color="menu.selected ? 'primary' : 'white'"
                />
              </q-item-section>
              <q-item-section
                :class="menu.selected ? 'text-primary' : 'text-white'"
                >{{ menu.label }}</q-item-section
              >
              <q-tooltip
                v-if="miniState"
                anchor="center right"
                self="center left"
                class="text-body2"
                transition-duration="0"
                :offset="[10, 10]"
                >{{ menu.label }}
              </q-tooltip>
            </q-item>
          </div>

          <q-item
            clickable
            v-ripple
            @click="showLogoutDialog = true"
            class="no-hover"
          >
            <q-item-section avatar>
              <q-icon name="logout" color="white" />
            </q-item-section>
            <q-item-section class="text-weight-bolder text-white"
              >ログアウト</q-item-section
            >
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              class="text-body2"
              transition-duration="0"
              :offset="[10, 10]"
              >ログアウト
            </q-tooltip>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="showHelpDialog = true"
            class="no-hover"
          >
            <q-item-section avatar>
              <q-icon name="info" color="white" />
            </q-item-section>
            <q-item-section class="text-weight-bolder text-white"
              >Web情報</q-item-section
            >
            <q-tooltip
              v-if="miniState"
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

    <q-page-container class="bg-white">
      <q-page>
        <header-layout />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
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
    const leftDrawerBreakpoint = ref(500);
    const leftDrawerOpenCloseButtonIcon = ref("menu");
    const miniState = ref(true);
    const menuList = ref([
      {
        label: "ホーム",
        icon: "home",
        to: "/admin/home",
        selected: false,
      },
      {
        label: "タスク登録",
        icon: "post_add",
        to: "/admin/register-task",
        selected: false,
      },
      {
        label: "タスク一覧",
        icon: "list_alt",
        to: "/admin/tasks",
        selected: false,
      },
      {
        label: "パスワード変更",
        icon: "settings",
        to: "/admin/change-password",
        selected: false,
      },
    ]);
    const showLogoutDialog = ref(false);
    const showHelpDialog = ref(false);
    const productName = ref(packageInfo.productName);
    const version = ref(packageInfo.version);
    const author = ref(packageInfo.author);
    const $q = useQuasar();
    const router = useRouter();
    const { currentRoute } = router;

    onBeforeMount(() => {
      menuList.value.forEach((v) => {
        v.selected = v.to === currentRoute.value.path;
      });
    });

    const updateMiniState = () => {
      miniState.value = !miniState.value && !isMobile();
    };

    const updateLeftDrawerOpenCloseButtonIcon = () => {
      leftDrawerOpenCloseButtonIcon.value = miniState.value
        ? "arrow_forward"
        : "arrow_back";
    };

    const isMobile = () => {
      return window.innerWidth <= leftDrawerBreakpoint.value;
    };

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
      leftDrawerBreakpoint,
      leftDrawerOpenCloseButtonIcon,
      miniState,
      menuList,
      showLogoutDialog,
      showHelpDialog,
      productName,
      version,
      author,
      updateMiniState,
      updateLeftDrawerOpenCloseButtonIcon,
      isMobile,
      getYear,
      logout,
    };
  },
});
</script>

<style lang="scss">
.no-hover .q-focus-helper {
  display: none;
}
</style>