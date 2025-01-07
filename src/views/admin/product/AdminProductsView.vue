<template>
  <div class="p-6">
    <AdminSubNavigation
      :tabs="tabs"
      :initialTab="activeTab"
      @update:activeTab="(tab) => {
        activeTab = tab;
      }"
    />

    <div class="mt-6">
      <Product v-if="activeTab === 'product'" />
      <AdminCategory v-if="activeTab === 'category'" />
      <AdminSize v-if="activeTab === 'size'" />
      <AdminColor v-if="activeTab === 'color'" />
      <ProductFeature v-if="activeTab === 'productFeature'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdminSubNavigation from "../../../components/AdminSubNavigation.vue";
import AdminCategory from "./AdminCategory.vue";
import AdminSize from "./AdminSize.vue";
import AdminColor from "./AdminColor.vue";
import ProductFeature from "./ProductFeature.vue";
import Product from "./ProductAdmin.vue";

const tabs = [
  { name: "product", label: "Product" },
  { name: "category", label: "Category" },
  { name: "size", label: "Size" },
  { name: "color", label: "Color" },
  { name: "productFeature", label: "Caractéristiques" },
];

const activeTab = ref("product"); 
</script>
