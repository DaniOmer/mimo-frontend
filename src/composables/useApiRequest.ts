import { ref } from "vue";

export function useApiRequest<T = any>() {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const execute = async (action: () => Promise<T>): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    try {
      const result = await action();
      data.value = result;
      return result;
    } catch (err: any) {
      error.value =
        err?.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      console.error("API Error:", error.value);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    execute,
  };
}
