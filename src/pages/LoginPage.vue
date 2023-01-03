<template>
  <q-page class="flex flex-center">
    <q-card bordered class="q-pa-lg shadow-2">
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
          <q-input
            square
            filled
            v-model="email"
            type="email"
            placeholder="メールアドレス"
            :rules="emailRules"
            lazy-rules
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            square
            filled
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="パスワード"
            :rules="passwordRules"
            lazy-rules
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

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
import packageInfo from "../../package.json";

export default defineComponent({
  name: "LoginPage",

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
      emailRules: [
        (val) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
          "メールアドレス形式で入力してください。",
      ],
      passwordRules: [
        (val) =>
          /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,15}$/i.test(val) ||
          "半角英数文字8～15文字の範囲で入力してください。",
      ],
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
