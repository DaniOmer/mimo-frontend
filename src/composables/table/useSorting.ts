import { ref, computed } from "vue";

export function useSorting(props: any, emit: any) {
  const sortKey = ref<string>("");
  const sortOrder = ref<"asc" | "desc">("asc");

  function handleSort(columnKey: string) {
    if (!props.enableSort) return;
    if (sortKey.value === columnKey) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = columnKey;
      sortOrder.value = "asc";
    }
    emit("sort-change", {
      sortKey: sortKey.value,
      sortOrder: sortOrder.value,
    });
  }

  const sortedItems = computed(() => {
    if (!props.enableSort || !sortKey.value) {
      return props.items;
    }
    const clone = [...props.items];
    clone.sort((a: any, b: any) => {
      const valA = a[sortKey.value];
      const valB = b[sortKey.value];
      if (valA === valB) return 0;
      if (sortOrder.value === "asc") {
        return valA < valB ? -1 : 1;
      }
      return valA > valB ? -1 : 1;
    });
    return clone;
  });

  return {
    sortKey,
    sortOrder,
    handleSort,
    sortedItems,
  };
}
