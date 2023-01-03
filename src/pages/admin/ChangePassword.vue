<template>
  <div align="center">
    <div class="q-pt-xl" style="width: 500px; max-width: 70%">
      <div class="text-subtitle1" style="text-align: left">
        現在のパスワード<span> (*)</span>
      </div>
      <q-input
        outlined
        dense
        v-model="nowPassword"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        lazy-rules
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <div class="text-subtitle1 q-pt-md" style="text-align: left">
        新しいパスワード<span> (*)</span>
      </div>
      <q-input
        outlined
        dense
        v-model="newPassword"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        lazy-rules
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <div class="text-subtitle1 q-pt-md" style="text-align: left">
        新しいパスワード(確認用)<span> (*)</span>
      </div>
      <q-input
        outlined
        dense
        v-model="newConfirmPassword"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        lazy-rules
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <q-btn
        rounded
        unelevated
        color="primary"
        size="md"
        class="full-width q-mt-xl"
        label="パスワード変更"
        @click="changePassword"
      />
    </div>
  </div>

  <q-dialog v-model="showConfirmDialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-blue-9">
        <q-icon name="info" size="sm" color="white" />
        <q-toolbar-title class="text-white">確認</q-toolbar-title>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup color="white" />
      </q-toolbar>

      <q-card-section class="q-pt-lg q-pb-none text-center text-subtitle1">
        パスワードを変更しました。
      </q-card-section>

      <q-card-actions vertical class="q-px-lg q-py-lg">
        <q-btn
          outline
          unelevated
          rounded
          label="閉じる"
          color="primary"
          to="/admin/home"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, QSpinnerIos } from "quasar";

export default defineComponent({
  name: "ChangePassword",

  setup() {
    const nowPassword = ref("");
    const newPassword = ref("");
    const newConfirmPassword = ref("");
    const showPassword = ref(false);
    const showConfirmDialog = ref(false);
    const $q = useQuasar();

    const changePassword = async () => {
      $q.loading.show({ spinner: QSpinnerIos });
      // TODO:パスワード変更用のAPIを呼び出す
      await new Promise((resolve) => setTimeout(resolve, 2000));
      $q.loading.hide();
      showConfirmDialog.value = true;
    };

    return {
      nowPassword,
      newPassword,
      newConfirmPassword,
      showPassword,
      showConfirmDialog,
      passwordRules: [
        (val) =>
          /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,15}$/i.test(val) ||
          "半角英数文字8～15文字の範囲で入力してください。",
      ],
      changePassword,
    };
  },
});
</script>

<style scoped>
span {
  color: red;
}
</style>