<template>
  <div class="q-pt-lg q-px-xl">
    <div class="row">
      <q-icon :name="selectedHeader.icon" size="md" class="q-pr-sm"></q-icon>
      <div class="text-h6">{{ selectedHeader.label }}</div>
    </div>
    <q-separator spaced="md" size="2px" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HeaderLayout",

  setup() {
    const router = useRouter();
    const { currentRoute } = router;
    const selectedHeader = ref({});

    const headers = [
      {
        label: "ホーム",
        icon: "home",
        path: "/admin/home",
      },
      {
        label: "パスワード変更",
        icon: "settings",
        path: "/admin/change-password",
      },
    ];

    watch(currentRoute, (to, _) => {
      const items = headers.filter((v) => to.path.includes(v.path));
      selectedHeader.value = items[0];
    });

    onMounted(() => {
      const items = headers.filter((v) =>
        currentRoute.value.path.includes(v.path)
      );
      selectedHeader.value = items[0];
    });

    return {
      selectedHeader,
    };
  },
});
</script>