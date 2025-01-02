import { ref } from "vue";

export function useApiRequest<T = any>() {
  const data = ref<T | null>(null);
  const status = ref<"pending" | "success" | "failed">("pending");
  const error = ref<string | null>(null);
  let controller: AbortController | null = null;

  const execute = async (action: () => Promise<T>): Promise<T | null> => {
    status.value = "pending";
    error.value = null;
    controller = new AbortController();

    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); USE FOR DEBUG ONLY
      const result = await action();
      data.value = result;
      status.value = "success";
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
        status.value = "failed";
        console.error("API ERROR THROW IN COMPOSABLE :", err);
        return null;
      }
    }
  };

  const cancel = () => {
    if (controller) {
      controller.abort();
    }
  };

  return {
    data,
    status,
    error,
    execute,
    cancel,
  };
}
