<template>
  <q-page class="flex flex-center">
    <q-card
      bordered
      class="q-pa-lg shadow-2"
      style="max-width: 500px; width: 95vw"
    >
      <q-card-section>
        <q-form class="q-gutter-md">
          <div style="text-align: center">
            <img
              alt="Quasar Logo"
              src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
              style="width: 75px; height: 75px"
            />
            <div class="text-h6 text-grey-7">{{ productName }}</div>
          </div>
          <email-input
            v-model="email"
            :filled="true"
            :square="true"
            placeholder="メールアドレス"
            :showMailIcon="true"
          ></email-input>

          <password-input
            v-model="password"
            v-model:showPassword="showPassword"
            :filled="true"
            :square="true"
            placeholder="パスワード"
            :showPasswordIcon="true"
          ></password-input>

          <q-card-actions class="q-px-md, q-px-none">
            <q-btn
              type="submit"
              rounded
              unelevated
              color="primary"
              size="md"
              class="full-width"
              label="ログイン"
              @click="login"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <router-link to="/reset-password" class="text-grey"
          >パスワードを忘れた場合はこちらをクリック</router-link
        >
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, QSpinnerIos } from "quasar";
import { useRouter } from "vue-router";
import EmailInput from "../components/EmailInput.vue";
import PasswordInput from "../components/PasswordInput.vue";
import packageInfo from "../../package.json";

export default defineComponent({
  name: "LoginPage",

  components: { EmailInput, PasswordInput },

  setup() {
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const productName = ref(packageInfo.productName);
    const $q = useQuasar();
    const router = useRouter();

    const login = async () => {
      $q.loading.show({ spinner: QSpinnerIos });
      // TODO:ログイン用のAPIを呼び出す
      await new Promise((resolve) => setTimeout(resolve, 2000));
      $q.loading.hide();
      router.push("/admin/home");
    };

    return {
      email,
      password,
      showPassword,
      productName,
      login,
    };
  },
});
</script>

<style scoped>
.q-card {
  width: 450px;
}
</style>
