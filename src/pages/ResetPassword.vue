<template>
  <q-page class="flex flex-center">
    <q-card
      bordered
      class="q-pa-lg shadow-2"
      style="max-width: 500px; width: 95vw"
    >
      <q-card-section>
        <q-form class="q-gutter-md">
          <h5 class="text-h5 text-center q-mt-none">パスワードリセット</h5>
          <email-input
            v-model="email"
            :filled="true"
            :square="true"
            placeholder="メールアドレス"
            :showMailIcon="true"
          ></email-input>

          <q-card-actions class="q-px-md, q-px-none">
            <q-btn
              type="submit"
              rounded
              unelevated
              color="primary"
              size="md"
              class="full-width"
              label="パスワード再設定のメールを送信"
              @click="resetPassword"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <div class="text-grey-6">
          上記メールアドレスに再設定用のURLが送信されます。
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showConfirmDialog" persistent>
      <q-card>
        <q-toolbar class="bg-blue-9">
          <q-icon name="info" size="sm" color="white" />
          <q-toolbar-title class="text-white">確認</q-toolbar-title>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            color="white"
            to="/"
          />
        </q-toolbar>

        <q-card-section class="q-pt-lg q-pb-none text-center text-subtitle1">
          <div>パスワード再設定のメールを送信しました。</div>
          <div>メールをご確認ください。</div>
        </q-card-section>

        <q-card-actions vertical class="q-px-lg q-py-lg">
          <q-btn
            outline
            unelevated
            rounded
            label="閉じる"
            color="primary"
            to="/"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, QSpinnerIos } from "quasar";
import EmailInput from "../components/EmailInput.vue";

export default defineComponent({
  name: "ResetPassword",

  components: { EmailInput },

  setup() {
    const email = ref("");
    const showConfirmDialog = ref(false);
    const $q = useQuasar();

    const resetPassword = async () => {
      $q.loading.show({ spinner: QSpinnerIos });
      // TODO:パスワードリセット用のAPIを呼び出す
      await new Promise((resolve) => setTimeout(resolve, 2000));
      $q.loading.hide();
      showConfirmDialog.value = true;
    };

    return {
      email,
      showConfirmDialog,
      emailRules: [
        (val) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
          "メールアドレス形式で入力してください。",
      ],
      resetPassword,
    };
  },
});
</script>

<style scoped>
.q-card {
  width: 450px;
}
</style>