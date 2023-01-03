<template>
  <div align="center">
    <div class="q-pt-md q-px-xl" style="width: 98%">
      <div class="text-subtitle1 q-pt-md" style="text-align: left">
        タイトル<span> (*)</span>
      </div>
      <q-input v-model="title" dense />

      <div class="text-subtitle1 q-pt-lg" style="text-align: left">詳細</div>
      <q-input v-model="detail" dense type="textarea" rows="3" />

      <div class="row q-gutter-xl q-pt-lg">
        <div class="col-lg col-md col-sm col-xs-10">
          <div class="text-subtitle1" style="text-align: left">開始日時</div>
          <q-input v-model="startDate" dense>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  @before-show="updateProxyStartDate"
                >
                  <q-date
                    v-model="proxyStartDate"
                    mask="YYYY年MM月DD日 HH:mm"
                    today-btn
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        label="キャンセル"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        v-close-popup
                        @click="saveStartDate"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  @before-show="updateProxyStartDate"
                >
                  <q-time
                    v-model="proxyStartDate"
                    mask="YYYY年MM月DD日 HH:mm"
                    format24h
                    now-btn
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        label="キャンセル"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        v-close-popup
                        @click="saveStartDate"
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-lg col-md col-sm col-xs-10">
          <div class="text-subtitle1" style="text-align: left">終了日時</div>
          <q-input v-model="endDate" dense>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  @before-show="updateProxyEndtDate"
                >
                  <q-date
                    v-model="proxyEndDate"
                    mask="YYYY年MM月DD日 HH:mm"
                    today-btn
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        label="キャンセル"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        v-close-popup
                        @click="saveEndDate"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  @before-show="updateProxyEndtDate"
                >
                  <q-time
                    v-model="proxyEndDate"
                    mask="YYYY年MM月DD日 HH:mm"
                    format24h
                    now-btn
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        label="キャンセル"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        v-close-popup
                        @click="saveEndDate"
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="row q-py-xl q-gutter-lg">
        <div class="col-lg col-md col-sm col-xs-11">
          <q-btn
            outline
            rounded
            unelevated
            color="primary"
            size="md"
            class="full-width"
            label="全てクリア"
            @click="clearAll"
          />
        </div>

        <div class="col-lg col-md col-sm col-xs-11">
          <q-btn
            rounded
            unelevated
            color="primary"
            size="md"
            class="full-width"
            label="登録"
            @click="registerTask"
          />
        </div>
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
          タスクを登録しました。
        </q-card-section>

        <q-card-actions vertical class="q-px-lg q-py-lg">
          <q-btn
            outline
            unelevated
            rounded
            label="閉じる"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, QSpinnerIos } from "quasar";

export default defineComponent({
  name: "RegisterTask",

  setup() {
    const title = ref("");
    const detail = ref("");
    const startDate = ref("");
    const proxyStartDate = ref("");
    const endDate = ref("");
    const proxyEndDate = ref(ref(""));
    const showConfirmDialog = ref(false);
    const $q = useQuasar();

    const clearAll = () => {
      title.value = "";
      detail.value = "";
      startDate.value = "";
      endDate.value = "";
    };

    const updateProxyStartDate = () => {
      proxyStartDate.value = startDate.value;
    };

    const updateProxyEndtDate = () => {
      proxyEndDate.value = endDate.value;
    };

    const saveStartDate = () => {
      startDate.value = proxyStartDate.value;
    };

    const saveEndDate = () => {
      endDate.value = proxyEndDate.value;
    };

    const registerTask = async () => {
      $q.loading.show({ spinner: QSpinnerIos });
      // TODO:タスク登録用のAPIを呼び出す
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showConfirmDialog.value = true;
      clearAll();
      $q.loading.hide();
    };

    return {
      title,
      detail,
      startDate,
      proxyStartDate,
      endDate,
      proxyEndDate,
      showConfirmDialog,
      clearAll,
      updateProxyStartDate,
      updateProxyEndtDate,
      saveStartDate,
      saveEndDate,
      registerTask,
    };
  },
});
</script>

<style scoped>
span {
  color: red;
}
</style>