import { ZodError, ZodSchema } from 'zod';

type ValidationResult = { error: string | null };

const ZodValidate = <T>(schema: ZodSchema<T>, data: unknown): ValidationResult => {
  try {
    schema.parse(data);
    return { error: null };
  } catch (err) {
    if (err instanceof ZodError) {
      return { error: err.errors[0].message };
    }
    return { error: String(err) };
  }
};

export { ZodValidate };
