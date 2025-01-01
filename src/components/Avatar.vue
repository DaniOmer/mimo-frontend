<template>
  <div
    class="w-[40px] h-[40px] flex justify-center items-center rounded-full text-sm"
    :class="user.avatar ? 'bg-transparent' : 'bg-secondary'"
    :title="userName"
  >
    <template v-if="user.avatar">
      <img
        :src="user.avatar"
        alt="User Avatar"
        class="w-full h-full rounded-full"
      />
    </template>
    <template v-else>
      <span class="font-bold">{{ initials }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { getInitials } from "../utils/string";
import { IUser } from "../api";

const props = defineProps<{
  user: IUser;
}>();

const initials = computed(() =>
  getInitials(props.user.firstName, props.user.lastName)
);

const userName = computed(
  () => `${props.user.firstName} ${props.user.lastName}`
);
</script>
