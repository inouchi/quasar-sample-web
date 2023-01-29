<template>
  <q-input
    :outlined="outlined"
    :dense="dense"
    :square="square"
    :filled="filled"
    :value="inputValue"
    type="email"
    :placeholder="placeholder"
    :rules="[requiredRule, emailRule]"
    hide-bottom-space
    @input="$emit('update:email', $event.target.value)"
    lazy-rules="ondemand"
  >
    <template v-slot:prepend v-if="showMailIcon">
      <q-icon name="email" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailInput",

  props: {
    inputValue: {
      type: String,
      default: "",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    showMailIcon: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const requiredRule = (val) => !!val || "メールアドレスを入力してください。";
    const emailRule = (val) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
      "メールアドレス形式で入力してください。";

    return {
      requiredRule,
      emailRule,
    };
  },
});
</script>