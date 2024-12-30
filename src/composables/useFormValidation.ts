import { ref } from "vue";
import { ZodSchema } from "zod";

export function useFormValidation<T extends Record<string, any>>(
  schema: ZodSchema<T>
) {
  const errors = ref<Partial<Record<keyof T, string>>>({});

  const validate = (data: T) => {
    errors.value = {};
    const result = schema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof T;
        errors.value[field] = err.message;
      });
    }

    return result.success;
  };

  return {
    errors,
    validate,
  };
}
