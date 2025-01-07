<template>
  <BaseCheckbox
    :modelValue="option.checked"
    :label="label"
    :name="name"
    @update:modelValue="handleInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseCheckbox from "./BaseCheckbox.vue";

const props = defineProps<{
  label: string;
  name: string;
  option: {
    value: string;
    label: string;
    checked: boolean;
  };
}>();

const emit = defineEmits(["update:filter"]);
const checked = ref(props.option.checked);

watch(
  () => props.option.checked,
  (newValue) => {
    checked.value = newValue;
  }
);

const handleInput = (isChecked: boolean) => {
  checked.value = isChecked;
  const updatedFilter = {
    ...props,
    checked: isChecked,
  };
  emit("update:filter", updatedFilter);
};
</script>
