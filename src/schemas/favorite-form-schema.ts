import { z } from 'zod';

export const favoriteFormSchema = z.object({
  title: z.string().min(2).max(50),
  url: z
    .string()
    .min(1)
    .transform((value) => {
      const trimmed = value.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }
      return `https://${trimmed}`;
    })
    .pipe(z.url()),
  description: z.string().min(2).max(120),
  type: z.enum(['articles', 'inspirations', 'sites', 'tutorials', 'tools']),
  tags: z.array(z.string().min(1)).min(1),
});

export type FavoriteFormData = z.infer<typeof favoriteFormSchema>;
