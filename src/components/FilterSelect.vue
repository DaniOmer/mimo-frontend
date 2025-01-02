<template>
  <div>
    <multiselect
      v-model="localValue"
      :options="options"
      :multiple="isMultiple"
      :searchable="true"
      :clear-on-select="!isMultiple"
      :close-on-select="!isMultiple"
      :placeholder="placeholder"
      track-by="value"
      label="label"
      @update:modelValue="onInput"
      class="custom-multiselect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps({
  modelValue: {
    type: [String, Number, Array, null],
    default: null,
  },
  isMultiple: {
    type: Boolean,
    default: false, 
  },
  placeholder: {
    type: String,
    default: 'Sélectionnez une option',
  },
  options: {
    type: Array as () => Option[],
    required: true,
  },
});


const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number> | null): void;
}>();

const localValue = ref<Option | Option[] | null>(null);

watch(
  () => props.modelValue,
  (newValue) => {
    if (props.isMultiple) {
      if (Array.isArray(newValue)) {
        localValue.value = props.options.filter((opt) => newValue.includes(opt.value));
      } else {
        localValue.value = [];
      }
    } else {
      localValue.value = props.options.find((opt) => opt.value === newValue) || null;
    }
  },
  { immediate: true }
);

const onInput = (selected: Option | Option[]) => {
  const newValue = props.isMultiple
    ? Array.isArray(selected)
      ? selected.map((opt) => opt.value)
      : []
    : (selected as Option | null)?.value || null;

  console.log('Émission de la nouvelle valeur depuis FilterSelect:', newValue);
  emit('update:modelValue', newValue);
};
</script>


