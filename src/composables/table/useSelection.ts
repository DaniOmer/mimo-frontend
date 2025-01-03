import { ref, computed } from "vue";

export function useSelection(props: any, emit: any, paginatedItems: any) {
  const selectedKeys = ref<string[]>([]);

  function getItemKey(rowData: any, idx: number) {
    return props.itemKey ? rowData[props.itemKey] : String(idx);
  }

  function toggleSelectAll(e: Event) {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      const keysOnPage = paginatedItems.value.map((itm: any, i: number) =>
        getItemKey(itm, i)
      );
      selectedKeys.value = [
        ...new Set([...selectedKeys.value, ...keysOnPage]),
      ];
    } else {
      const keysOnPage = paginatedItems.value.map((itm: any, i: number) =>
        getItemKey(itm, i)
      );
      selectedKeys.value = selectedKeys.value.filter(
        (k: string) => !keysOnPage.includes(k)
      );
    }
    emit("selection-change", selectedKeys.value);
  }

  function toggleRowSelect(rowData: any, idx: number) {
    const key = getItemKey(rowData, idx);
    if (selectedKeys.value.includes(key)) {
      selectedKeys.value = selectedKeys.value.filter((k: string) => k !== key);
    } else {
      selectedKeys.value.push(key);
    }
    emit("selection-change", selectedKeys.value);
  }

  const allSelected = computed(() => {
    if (!paginatedItems.value.length) return false;
    const keysOnPage = paginatedItems.value.map((itm: any, i: number) =>
      getItemKey(itm, i)
    );
    return keysOnPage.every((k: string) => selectedKeys.value.includes(k));
  });

  return {
    selectedKeys,
    toggleSelectAll,
    toggleRowSelect,
    allSelected,
    getItemKey,
  };
}
