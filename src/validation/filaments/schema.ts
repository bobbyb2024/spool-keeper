import * as z from 'zod';

export const filamentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  material: z.string().min(1, 'Material is required'),
  color: z.string().min(1, 'Color is required'),
  diameter: z.number().min(0.1).max(10),
  initialWeight: z.number().min(0),
  currentWeight: z.number().min(0),
  spoolWeight: z.number().min(0),
  price: z.number().min(0),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type FilamentFormData = z.infer<typeof filamentSchema>; 