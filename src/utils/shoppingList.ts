import type { Ingredient, Recipe } from '../../shared/src/schemas'

export type ShoppingItem = {
  id: string
  name: string
  normalizedName: string
  quantity: number
  unit: string
  displayText: string
  category: Ingredient['category']
  isPantryItem: boolean
  isChecked: boolean
}

export const generateShoppingList = (recipes: Recipe[]): ShoppingItem[] => {
  const itemMap = new Map<string, ShoppingItem>()

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const key = `${ingredient.name.toLowerCase().trim()}-${ingredient.unit}`
      const existing = itemMap.get(key)

      if (existing) {
        existing.quantity += ingredient.quantity
        existing.displayText = `${existing.quantity} ${existing.unit} ${existing.name}`
        return
      }

      itemMap.set(key, {
        id: crypto.randomUUID(),
        name: ingredient.name,
        normalizedName: ingredient.name.toLowerCase().trim(),
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        displayText: `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`,
        category: ingredient.category,
        isPantryItem: ingredient.isPantryItem ?? false,
        isChecked: false,
      })
    })
  })

  return Array.from(itemMap.values())
}
