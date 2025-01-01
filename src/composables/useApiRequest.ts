import { ref } from "vue";

export function useApiRequest<T = any>() {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let controller: AbortController | null = null;

  const execute = async (action: () => Promise<T>): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    controller = new AbortController();

    try {
      const result = await action();
      data.value = result;
      return result;
    } catch (err: any) {
      if (err.name === "AbortError") {
        error.value = "Request cancelled successfully";
        return null;
      } else {
        error.value =
          err?.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.";
        console.error("API ERROR THROW IN COMPOSABLE :", err);
        return null;
      }
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    if (controller) {
      controller.abort();
    }
  };

  return {
    data,
    loading,
    error,
    execute,
    cancel,
  };
}
