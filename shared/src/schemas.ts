import { z } from 'zod'

export const IngredientSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
  category: z.enum(['produce', 'meat-seafood', 'dairy', 'bakery', 'pantry', 'spices', 'frozen', 'canned', 'other']),
  isPantryItem: z.boolean().optional(),
})

export const RecipeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  cuisine: z.string(),
  originCountry: z.string(),
  authenticityLabel: z.enum(['traditional', 'widely_recognized', 'common_variation', 'adapted_to_preferences']),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  totalTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  ingredients: z.array(IngredientSchema),
  steps: z.array(z.string()),
  allergenFlags: z.array(z.string()),
  dietaryTags: z.array(z.string()),
  whyItFits: z.string(),
})

export const MealPlanInputSchema = z.object({
  days: z.number(),
  servings: z.number(),
  maxTotalTimeMinutes: z.number(),
  dietaryPattern: z.string().optional(),
  allergens: z.array(z.string()),
  excludedIngredients: z.array(z.string()),
  preferredCuisines: z.array(z.string()),
  pantryItems: z.string().optional(),
  notes: z.string().optional(),
})

export type MealPlanInput = z.infer<typeof MealPlanInputSchema>
export type Recipe = z.infer<typeof RecipeSchema>
export type Ingredient = z.infer<typeof IngredientSchema>
