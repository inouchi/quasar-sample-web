<template>
  <div>
    <q-layout
      view="hHh Lpr lff"
      class="bg-blue window-height window-width row justify-center items-center"
    >
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackgroundLayout",
});
</script>