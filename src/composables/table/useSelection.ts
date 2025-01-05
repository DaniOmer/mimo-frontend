import { ref, computed, Ref } from "vue";

export function useSelection(props: any, emit: any, paginatedItems: Ref<any[]>) {
  const selectedKeys: Ref<string[]> = ref([]);

  function toggleSelectAll() {
    if (allSelected.value) {
      selectedKeys.value = [];
    } else {
      selectedKeys.value = paginatedItems.value.map((item: any) => String(item[props.itemKey]));
    }
    emit("selection-change", selectedKeys.value);
  }

  function toggleRowSelect(item: any, index: number) {
    const key = getItemKey(item, index);
    const idx = selectedKeys.value.indexOf(key);
    if (idx > -1) {
      selectedKeys.value.splice(idx, 1);
    } else {
      selectedKeys.value.push(key);
    }
    emit("selection-change", selectedKeys.value);
  }

  function getItemKey(item: any, index: number): string {
    return String(item[props.itemKey]) || String(index);
  }

  const allSelected = computed(() => {
    return paginatedItems.value.length > 0 && paginatedItems.value.every((item: any) => selectedKeys.value.includes(String(item[props.itemKey])));
  });

  return {
    selectedKeys,
    toggleSelectAll,
    toggleRowSelect,
    allSelected,
    getItemKey,
  };
}
