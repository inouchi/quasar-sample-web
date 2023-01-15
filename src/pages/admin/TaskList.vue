<template>
  <div align="center">
    <div class="q-pb-lg q-px-lg" style="width: 95%">
      <q-card flat bordered class="q-mt-lg">
        <q-card-section class="q-px-lg q-py-md bg-grey-1">
          <div class="row q-gutter-lg">
            <div class="col-lg-4 col-md-5 col-sm-11 col-xs-11">
              <div class="text-subtitle2 q-pb-xs" style="text-align: left">
                キーワード
              </div>
              <q-input
                v-model="keyword"
                outlined
                dense
                class="bg-white"
              ></q-input>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-11 col-xs-11">
              <div class="text-subtitle2 q-pb-xs" style="text-align: left">
                タスク期間（開始日時 ～ 終了日時）
              </div>

              <div class="row">
                <div class="col-lg col-md col-sm col-xs-12">
                  <q-input
                    v-model="startDate"
                    outlined
                    dense
                    class="bg-white"
                    mask="####-##-## ##:##"
                  >
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
                            mask="YYYY-MM-DD HH:mm"
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
                            mask="YYYY-MM-DD HH:mm"
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

                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-12 self-center">
                  ～
                </div>

                <div class="col-lg col-md col-sm col-xs-12">
                  <q-input
                    v-model="endDate"
                    outlined
                    dense
                    class="bg-white"
                    mask="####-##-## ##:##"
                  >
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
                            mask="YYYY-MM-DD HH:mm"
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
                            mask="YYYY-MM-DD HH:mm"
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
            </div>

            <div class="col-lg-1 col-md-5 col-sm-5 col-xs-11">
              <div class="text-subtitle2 q-pb-xs" style="text-align: left">
                ステータス
              </div>
              <q-select
                outlined
                dense
                multiple
                stack-label
                use-chips
                class="bg-white"
                v-model="statuses"
                :options="statusOptions"
                map-options
                emit-value
                behavior="menu"
              >
                <template v-slot:selected-item="scope">
                  <q-chip
                    removable
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    :color="getStatusColor(scope.opt.value)"
                    text-color="white"
                  >
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
              </q-select>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-5 self-end">
              <q-btn
                outline
                unelevated
                color="primary"
                class="q-mb-xs full-width bg-white"
                @click="reset"
                >リセット</q-btn
              >
            </div>

            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-4 self-end">
              <q-btn
                unelevated
                color="primary"
                class="q-mb-xs full-width"
                @click="search"
                >検索</q-btn
              >
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-pa-xs">
            <q-table
              flat
              bordered
              hide-bottom
              :rows="rows"
              :columns="columns"
              separator="vertical"
              row-key="title"
              class="q-pb-none"
              @row-click="onRowClick"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="bg-blue-2"
                    style="
                      font-size: medium;
                      font-weight: bold;
                      text-align: center;
                    "
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body-cell-status="props">
                <q-td
                  :props="props"
                  :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-2'"
                >
                  <q-btn
                    :label="getStatusLabel(props.value)"
                    :color="getStatusColor(props.value)"
                    unelevated
                    rounded
                    dense
                    @click.stop
                    style="width: 75px"
                  >
                    <q-menu
                      anchor="bottom middle"
                      self="top middle"
                      class="bg-grey-1"
                      :offset="[0, 10]"
                    >
                      <q-list style="min-width: 100px">
                        <q-item
                          ><q-item-section>
                            <div class="full-width row justify-center">
                              ステータス変更
                            </div>
                          </q-item-section></q-item
                        >
                        <q-separator />

                        <div
                          v-for="status in statusOptions"
                          :key="status.value"
                        >
                          <q-item
                            clickable
                            v-close-popup
                            @click="changeStatus(props.rowIndex, status.value)"
                            v-show="props.value !== status.value"
                          >
                            <div class="full-width row justify-center">
                              <q-btn
                                v-model="rows[props.rowIndex].status"
                                :label="getStatusLabel(status.value)"
                                :color="getStatusColor(status.value)"
                                unelevated
                                rounded
                                dense
                                style="width: 75px; align-self: center"
                              />
                            </div>
                          </q-item>
                        </div>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-td>
              </template>

              <template v-slot:body-cell="props">
                <q-td
                  :props="props"
                  :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-2'"
                >
                  {{ props.value }}
                </q-td>
              </template>
            </q-table>
          </div>

          <div class="row justify-end q-pr-md q-pt-sm">
            <q-pagination
              v-model="page"
              :max="maxPage"
              max-pages="6"
              direction-links
              boundary-links
              icon-first="keyboard_double_arrow_left"
              icon-last="keyboard_double_arrow_right"
              icon-prev="keyboard_arrow_left"
              icon-next="keyboard_arrow_right"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="showEditDialog">
      <q-card>
        <q-toolbar class="bg-blue-9">
          <q-icon name="edit" size="sm" color="white" />
          <q-toolbar-title class="text-white">タスク編集</q-toolbar-title>
          <q-space />
          <q-btn icon="close" color="white" flat round dense v-close-popup />
        </q-toolbar>
        <div class="q-pb-md q-px-md">
          <q-card-section>
            <div class="text-subtitle1 q-pt-md" style="text-align: left">
              タイトル<span> (*)</span>
            </div>
            <q-input v-model="editedTask.title" dense />

            <div class="text-subtitle1 q-pt-lg" style="text-align: left">
              詳細
            </div>
            <q-input
              v-model="editedTask.detail"
              dense
              type="textarea"
              rows="3"
            />

            <div class="row q-gutter-xl q-pt-lg">
              <div class="col-lg col-md col-sm col-xs-10">
                <div class="text-subtitle1" style="text-align: left">
                  開始日時
                </div>
                <q-input
                  v-model="editedTask.startDate"
                  dense
                  mask="####-##-## ##:##"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                        @before-show="updateProxyEditedStartDate"
                      >
                        <q-date
                          v-model="proxyEditedStartDate"
                          mask="YYYY-MM-DD HH:mm"
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
                              @click="saveEditedStartDate"
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
                        @before-show="updateProxyEditedStartDate"
                      >
                        <q-time
                          v-model="proxyEditedStartDate"
                          mask="YYYY-MM-DD HH:mm"
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
                              @click="saveEditedStartDate"
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-lg col-md col-sm col-xs-10">
                <div class="text-subtitle1" style="text-align: left">
                  終了日時
                </div>
                <q-input
                  v-model="editedTask.endDate"
                  dense
                  mask="####-##-## ##:##"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                        @before-show="updateProxyEditedEndDate"
                      >
                        <q-date
                          v-model="proxyEditedEndDate"
                          mask="YYYY-MM-DD HH:mm"
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
                              @click="saveEditedEndDate"
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
                        @before-show="updateProxyEditedEndDate"
                      >
                        <q-time
                          v-model="proxyEditedEndDate"
                          mask="YYYY-MM-DD HH:mm"
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
                              @click="saveEditedEndDate"
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-gutter-xl q-pt-lg">
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-10">
                <div class="text-subtitle1 q-pb-xs" style="text-align: left">
                  ステータス
                </div>

                <q-select
                  outlined
                  dense
                  class="bg-white"
                  v-model="editedTask.status"
                  :options="statusOptions"
                  map-options
                  emit-value
                  behavior="menu"
                >
                  <template v-slot:selected-item="scope">
                    <q-chip
                      dense
                      :tabindex="scope.tabindex"
                      :color="getStatusColor(scope.opt.value)"
                      text-color="white"
                      class="q-px-md"
                    >
                      {{ scope.opt.label }}
                    </q-chip>
                  </template>
                </q-select>
              </div>
            </div>

            <div class="row q-pt-xl q-gutter-lg">
              <div class="col-lg col-md col-sm col-xs-11">
                <q-btn
                  outline
                  rounded
                  unelevated
                  color="primary"
                  size="md"
                  class="full-width"
                  label="キャンセル"
                  v-close-popup
                />
              </div>

              <div class="col-lg col-md col-sm col-xs-11">
                <q-btn
                  rounded
                  unelevated
                  color="primary"
                  size="md"
                  class="full-width"
                  label="変更"
                  @click="changeTask"
                />
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, QSpinnerIos } from "quasar";
import dateFormat from "dateformat";

export default defineComponent({
  name: "TaskList",

  setup() {
    const keyword = ref("");
    const startDate = ref("");
    const proxyStartDate = ref("");
    const proxyEditedStartDate = ref("");
    const endDate = ref("");
    const proxyEndDate = ref("");
    const proxyEditedEndDate = ref("");
    const statuses = ref([]);
    const page = ref(1);
    const maxPage = ref(10);
    let editedIndex = ref(null);
    let editedTask = ref({
      title: "",
      detail: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    const showEditDialog = ref(false);
    const $q = useQuasar();

    const columns = [
      {
        name: "title",
        required: true,
        label: "タイトル",
        align: "left",
        style: "font-size: 14px",
        field: (row) => row.title,
        format: (val) => `${val}`,
      },
      {
        name: "detail",
        align: "center",
        label: "詳細",
        field: "detail",
        align: "left",
        style: "font-size: 14px; width: 500px",
      },
      {
        name: "startDate",
        label: "開始日時",
        field: "startDate",
        align: "center",
        style: "font-size: 14px; width: 250px",
        format: (val) => dateFormat(val, "yyyy-mm-dd HH:MM"),
        sortable: true,
      },
      {
        name: "endDate",
        label: "終了日時",
        field: "endDate",
        align: "center",
        style: "font-size: 14px; width: 250px",
        format: (val) => dateFormat(val, "yyyy-mm-dd HH:MM"),
        sortable: true,
      },
      {
        name: "status",
        label: "ステータス",
        field: "status",
        align: "center",
        style: "font-size: 14px; width: 200px",
        sortable: true,
        // format: (val) => getStatusLabel(val),
      },
    ];

    let rows = ref([
      {
        title: "買い物",
        detail: "牛乳、パン、大根",
        startDate: "2022-11-01 12:00:00",
        endDate: "2022-11-01 14:00:00",
        status: "completed",
      },
      {
        title: "テスト勉強",
        detail: "数学 p.25～p.55",
        startDate: "2022-11-05 10:00:00",
        endDate: "2022-11-05 13:00:00",
        status: "waiting",
      },
      {
        title: "プログラミング",
        detail: "タスク管理アプリを作成",
        startDate: "2022-12-01 13:00:00",
        endDate: "2022-12-05 15:00:00",
        status: "working",
      },
    ]);

    const reset = () => {
      keyword.value = "";
      startDate.value = "";
      proxyStartDate.value = "";
      endDate.value = "";
      proxyEndDate.value = "";
      statuses.value = [];
    };

    const updateProxyStartDate = () => {
      if (startDate.value) {
        proxyStartDate.value = startDate.value;
      } else {
        proxyStartDate.value = dateFormat(Date(), "yyyy-mm-dd 00:00");
      }
    };

    const updateProxyEditedStartDate = () => {
      proxyEditedStartDate.value = editedTask.value.startDate;
    };

    const updateProxyEndtDate = () => {
      if (endDate.value) {
        proxyEndDate.value = endDate.value;
      } else {
        proxyEndDate.value = dateFormat(Date(), "yyyy-mm-dd 00:00");
      }
    };

    const updateProxyEditedEndDate = () => {
      proxyEditedEndDate.value = editedTask.value.endDate;
    };

    const saveStartDate = () => {
      startDate.value = proxyStartDate.value;
    };

    const saveEditedStartDate = () => {
      editedTask.value.startDate = proxyEditedStartDate.value;
    };

    const saveEndDate = () => {
      endDate.value = proxyEndDate.value;
    };

    const saveEditedEndDate = () => {
      editedTask.value.endDate = proxyEditedEndDate.value;
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case "waiting":
          return "未着手";
        case "working":
          return "進行中";
        case "completed":
          return "完了";
        case "pending":
          return "保留";
        default:
          return "";
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "waiting":
          return "grey";
        case "working":
          return "blue";
        case "completed":
          return "green";
        case "pending":
          return "red";
        default:
          return "grey";
      }
    };

    const search = async () => {
      $q.loading.show({ spinner: QSpinnerIos });
      // TODO:検索用のAPIを呼び出す
      await new Promise((resolve) => setTimeout(resolve, 2000));
      $q.loading.hide();
      console.log(statuses);
    };

    const changeStatus = async (index, status) => {
      $q.loading.show({ spinner: QSpinnerIos });
      {
        // TODO:タスク内容更新と同条件でタスク一覧を取得するAPIを呼び出す
        await new Promise((resolve) => setTimeout(resolve, 2000));
        rows.value[index].status = status;
      }
      $q.loading.hide();
    };

    const changeTask = async () => {
      console.log(proxyStartDate.value);
      console.log(editedTask.value.startDate);
      $q.loading.show({ spinner: QSpinnerIos });
      {
        // TODO:タスク内容更新と同条件でタスク一覧を取得するAPIを呼び出す
        await new Promise((resolve) => setTimeout(resolve, 2000));
        rows.value[editedIndex.value].title = editedTask.value.title;
        rows.value[editedIndex.value].detail = editedTask.value.detail;
        rows.value[editedIndex.value].startDate = editedTask.value.startDate;
        rows.value[editedIndex.value].endDate = editedTask.value.endDate;
        rows.value[editedIndex.value].status = editedTask.value.status;
      }
      $q.loading.hide();
    };

    const onRowClick = (_, row, index) => {
      editedIndex.value = index;
      editedTask.value = Object.assign({}, row);
      showEditDialog.value = true;
    };

    return {
      keyword,
      columns,
      rows,
      startDate,
      proxyStartDate,
      proxyEditedStartDate,
      endDate,
      proxyEndDate,
      proxyEditedEndDate,
      statuses,
      page,
      maxPage,
      editedIndex,
      editedTask,
      showEditDialog,
      statusOptions: [
        { label: "未着手", value: "waiting" },
        { label: "進行中", value: "working" },
        { label: "完了", value: "completed" },
        { label: "保留", value: "pending" },
      ],
      reset,
      updateProxyStartDate,
      updateProxyEditedStartDate,
      updateProxyEndtDate,
      updateProxyEditedEndDate,
      saveStartDate,
      saveEditedStartDate,
      saveEndDate,
      saveEditedEndDate,
      getStatusLabel,
      getStatusColor,
      search,
      changeStatus,
      changeTask,
      onRowClick,
    };
  },
});
</script>

<style scoped>
span {
  color: red;
}
</style>