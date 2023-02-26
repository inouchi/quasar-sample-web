<template>
  <q-input
    :outlined="outlined"
    :dense="dense"
    :square="square"
    :filled="filled"
    :value="inputValue"
    :type="showPassword ? 'text' : 'password'"
    :placeholder="placeholder"
    :rules="[requiredRule, passwordRule]"
    hide-bottom-space
    @input="$emit('update:password', $event.target.value)"
    lazy-rules="ondemand"
  >
    <template v-slot:prepend v-if="showPasswordIcon">
      <q-icon name="lock" />
    </template>
    <template v-slot:append>
      <q-icon
        :name="showPassword ? 'visibility_off' : 'visibility'"
        @click="$emit('update:showPassword', !showPassword)"
      />
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PasswordInput",

  props: {
    inputValue: {
      type: String,
      default: "",
    },
    showPassword: {
      type: Boolean,
      default: false,
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
    showPasswordIcon: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const requiredRule = (val) => !!val || "パスワードを入力してください。";
    const passwordRule = (val) =>
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,15}$/i.test(val) ||
      "半角英数文字8～15文字の範囲で入力してください。";

    return {
      requiredRule,
      passwordRule,
    };
  },
});
</script>