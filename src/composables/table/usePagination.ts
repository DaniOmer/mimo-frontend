import { ref, computed } from "vue";

export function usePagination(props: any, emit: any, sortedItems: any) {
  const currentPage = ref<number>(props.defaultPage);

  const totalItems = computed(() => sortedItems.value.length);
  const totalPagesComputed = computed(() => {
    if (!props.enablePagination || props.pageSize <= 0) return 1;
    return Math.ceil(totalItems.value / props.pageSize);
  });

  const paginatedItems = computed(() => {
    if (!props.enablePagination) return sortedItems.value;
    const startIndex = (currentPage.value - 1) * props.pageSize;
    return sortedItems.value.slice(startIndex, startIndex + props.pageSize);
  });

  const shouldShowPagination = computed(
    () => props.enablePagination && totalPagesComputed.value > 1
  );

  function goToPage(page: number) {
    if (page < 1 || page > totalPagesComputed.value) return;
    currentPage.value = page;
    emit("page-change", { page, pageSize: props.pageSize });
  }

  const pagesArray = computed(() => {
    const arr: number[] = [];
    for (let i = 1; i <= totalPagesComputed.value; i++) {
      arr.push(i);
    }
    return arr;
  });

  const startIndex = computed(() => (currentPage.value - 1) * props.pageSize);
  const endIndex = computed(
    () => startIndex.value + paginatedItems.value.length
  );

  return {
    currentPage,
    totalItems,
    totalPagesComputed,
    paginatedItems,
    shouldShowPagination,
    goToPage,
    pagesArray,
    startIndex,
    endIndex,
  };
}
