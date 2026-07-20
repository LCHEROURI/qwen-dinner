import { useMemo, useState } from 'react'
import {
  ArrowRight, CalendarDays, Check, ChevronRight, Clock3, Leaf,
  Minus, Plus, ShoppingBag, Sparkles, UtensilsCrossed, X,
} from 'lucide-react'
import { generateShoppingList } from './utils/shoppingList'
import type { Recipe } from '../shared/src/schemas'

type View = 'plan' | 'recipes' | 'shopping'

const recipes: Recipe[] = [
  {
    id: 'lemon-pasta', name: 'Lemon garlic pasta with spinach', description: 'Bright, silky pasta with greens and parmesan.', cuisine: 'Italian', originCountry: 'Italy', authenticityLabel: 'common_variation', prepTimeMinutes: 10, cookTimeMinutes: 15, totalTimeMinutes: 25, servings: 2, difficulty: 'beginner',
    ingredients: [
      { name: 'spaghetti', quantity: 8, unit: 'oz', category: 'pantry' }, { name: 'lemon', quantity: 1, unit: 'whole', category: 'produce' }, { name: 'garlic', quantity: 2, unit: 'cloves', category: 'produce' }, { name: 'baby spinach', quantity: 4, unit: 'cups', category: 'produce' }, { name: 'parmesan', quantity: 0.5, unit: 'cup', category: 'dairy' },
    ], steps: ['Boil pasta until al dente.', 'Sauté garlic in olive oil.', 'Toss pasta with lemon, spinach, and parmesan.'], allergenFlags: ['gluten', 'dairy'], dietaryTags: ['vegetarian'], whyItFits: 'A fast, comforting vegetarian dinner for a busy weeknight.',
  },
  {
    id: 'harissa-bowl', name: 'Harissa chickpea bowls', description: 'Crispy chickpeas, roasted vegetables, and cool tahini.', cuisine: 'Middle Eastern', originCountry: 'Lebanon', authenticityLabel: 'adapted_to_preferences', prepTimeMinutes: 10, cookTimeMinutes: 25, totalTimeMinutes: 35, servings: 2, difficulty: 'beginner',
    ingredients: [
      { name: 'chickpeas', quantity: 1, unit: 'can', category: 'canned' }, { name: 'sweet potato', quantity: 1, unit: 'whole', category: 'produce' }, { name: 'kale', quantity: 1, unit: 'bunch', category: 'produce' }, { name: 'tahini', quantity: 0.25, unit: 'cup', category: 'pantry' }, { name: 'harissa', quantity: 2, unit: 'tbsp', category: 'spices' },
    ], steps: ['Roast chickpeas and sweet potato with harissa.', 'Massage kale with lemon.', 'Layer bowls and drizzle with tahini.'], allergenFlags: ['sesame'], dietaryTags: ['vegan'], whyItFits: 'Plant-forward, filling, and excellent for leftovers.',
  },
  {
    id: 'salmon-tray', name: 'Sheet-pan salmon & greens', description: 'Citrusy salmon with crisp green beans and potatoes.', cuisine: 'American', originCountry: 'United States', authenticityLabel: 'common_variation', prepTimeMinutes: 10, cookTimeMinutes: 20, totalTimeMinutes: 30, servings: 2, difficulty: 'beginner',
    ingredients: [
      { name: 'salmon fillets', quantity: 2, unit: 'fillets', category: 'meat-seafood' }, { name: 'green beans', quantity: 12, unit: 'oz', category: 'produce' }, { name: 'baby potatoes', quantity: 12, unit: 'oz', category: 'produce' }, { name: 'lemon', quantity: 1, unit: 'whole', category: 'produce' }, { name: 'dijon mustard', quantity: 1, unit: 'tbsp', category: 'pantry' },
    ], steps: ['Roast potatoes until tender.', 'Add salmon and green beans.', 'Finish with lemon and mustard dressing.'], allergenFlags: ['fish'], dietaryTags: ['pescatarian', 'gluten-free'], whyItFits: 'One pan, minimal cleanup, and a balanced protein-forward dinner.',
  },
]

const preferences = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Low-carb', 'Pescatarian']
const categoryLabels: Record<string, string> = { produce: 'Produce', pantry: 'Pantry', canned: 'Pantry', spices: 'Pantry', dairy: 'Dairy', 'meat-seafood': 'Protein' }

export default function App() {
  const [view, setView] = useState<View>('plan')
  const [days, setDays] = useState(5)
  const [servings, setServings] = useState(2)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['Vegetarian'])
  const [note, setNote] = useState('')
  const [generated, setGenerated] = useState(true)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const shoppingItems = useMemo(() => generateShoppingList(recipes), [])
  const nav = [{ id: 'plan' as const, label: 'Plan', icon: CalendarDays }, { id: 'recipes' as const, label: 'Recipes', icon: UtensilsCrossed }, { id: 'shopping' as const, label: 'Shopping list', icon: ShoppingBag }]

  const togglePreference = (preference: string) => setSelectedPreferences((current) => current.includes(preference) ? current.filter((item) => item !== preference) : [...current, preference])
  const generatePlan = () => { setGenerated(false); window.setTimeout(() => setGenerated(true), 500) }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView('plan')} aria-label="Go to plan"><span className="brand-mark"><UtensilsCrossed size={23} /></span><span>qwen<br /><em>dinner</em></span></button>
        <nav aria-label="Primary navigation">{nav.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? 'nav-item active' : 'nav-item'} onClick={() => setView(id)}><Icon size={20} />{label}</button>)}</nav>
        <div className="sidebar-note"><Sparkles size={17} /><p>Thoughtful dinners, without the nightly decision.</p></div>
      </aside>

      <section className="content">
        <header className="topbar"><div><p className="date">THIS WEEK</p><h1>{view === 'plan' ? 'Dinner, solved.' : view === 'recipes' ? 'Your recipes' : 'Shopping list'}</h1></div><button className="profile" aria-label="Your profile">LC</button></header>

        {view === 'plan' && <div className="plan-layout">
          <section className="planner panel"><div className="section-heading"><div><span className="icon-disc"><Sparkles size={18} /></span><h2>What sounds good?</h2></div><p>Tell us a little about the week ahead.</p></div>
            <fieldset><legend>Dietary preferences</legend><div className="chips">{preferences.map((preference) => <button key={preference} type="button" onClick={() => togglePreference(preference)} className={selectedPreferences.includes(preference) ? 'chip selected' : 'chip'}>{selectedPreferences.includes(preference) && <Check size={14} />}{preference}</button>)}</div></fieldset>
            <label className="notes-label">Anything to avoid?<input value={note} onChange={(event) => setNote(event.target.value)} placeholder="e.g. shellfish, mushrooms, cilantro" /></label>
            <div className="number-row"><Stepper label="Dinners" value={days} min={3} max={7} onChange={setDays} /><Stepper label="Servings" value={servings} min={1} max={8} onChange={setServings} /></div>
            <button className="generate" onClick={generatePlan}><Sparkles size={19} />{generated ? 'Generate my plan' : 'Creating your plan…'}</button>
          </section>
          <section className="plan-results"><div className="results-head"><div><p className="eyebrow">READY FOR YOU</p><h2>{days}-night plan</h2><p>Balanced ideas for {servings} people.</p></div><button onClick={() => setView('recipes')}>See all recipes <ArrowRight size={16} /></button></div>
            <div className="recipe-grid">{recipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index} onOpen={() => setSelectedRecipe(recipe)} />)}</div>
            <button className="shopping-preview" onClick={() => setView('shopping')}><span className="preview-icon"><ShoppingBag size={19} /></span><span><strong>Shopping list ready</strong><small>{shoppingItems.length} ingredients organized by aisle</small></span><ChevronRight size={20} /></button>
          </section>
        </div>}

        {view === 'recipes' && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">YOUR WEEK</p><h2>Recipes worth looking forward to.</h2></div><button className="small-button" onClick={() => setView('plan')}>Adjust plan</button></div><div className="recipe-grid expanded">{recipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index} onOpen={() => setSelectedRecipe(recipe)} />)}</div></section>}

        {view === 'shopping' && <section className="page-panel shopping-page"><div className="page-heading"><div><p className="eyebrow">FOR YOUR PLAN</p><h2>Everything, in one list.</h2><p>{shoppingItems.length} ingredients across {new Set(shoppingItems.map((item) => categoryLabels[item.category])).size} aisles.</p></div><button className="small-button" onClick={() => setView('plan')}>Back to plan</button></div><div className="shopping-grid">{Array.from(new Set(Object.values(categoryLabels))).filter((label) => shoppingItems.some((item) => categoryLabels[item.category] === label)).map((label) => <article key={label} className="shopping-category"><h3>{label}</h3>{shoppingItems.filter((item) => categoryLabels[item.category] === label).map((item) => <label key={item.id} className="shopping-row"><input type="checkbox" /><span>{item.name}</span><small>{item.quantity} {item.unit}</small></label>)}</article>)}</div></section>}
      </section>

      {selectedRecipe && <div className="modal-backdrop" onMouseDown={() => setSelectedRecipe(null)}><article className="recipe-modal" onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={() => setSelectedRecipe(null)} aria-label="Close recipe"><X size={20} /></button><div className={`modal-art art-${selectedRecipe.id}`}><span>{selectedRecipe.cuisine}</span></div><p className="eyebrow">{selectedRecipe.difficulty} · {selectedRecipe.totalTimeMinutes} min</p><h2>{selectedRecipe.name}</h2><p className="modal-description">{selectedRecipe.description}</p><div className="modal-columns"><div><h3>Ingredients</h3>{selectedRecipe.ingredients.map((ingredient) => <p key={ingredient.name}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>)}</div><div><h3>How to make it</h3>{selectedRecipe.steps.map((step, index) => <p key={step}><b>{index + 1}</b>{step}</p>)}</div></div></article></div>}
    </main>
  )
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <div className="stepper-wrap"><span>{label}</span><div className="stepper"><button aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))}><Minus size={17} /></button><strong>{value}</strong><button aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(max, value + 1))}><Plus size={17} /></button></div></div>
}

function RecipeCard({ recipe, index, onOpen }: { recipe: Recipe; index: number; onOpen: () => void }) {
  const art = ['art-lemon-pasta', 'art-harissa-bowl', 'art-salmon-tray'][index]
  return <article className="recipe-card"><div className={`recipe-art ${art}`}><span>{recipe.cuisine}</span></div><div className="recipe-copy"><div className="recipe-meta"><span><Clock3 size={15} />{recipe.totalTimeMinutes} min</span><span><Leaf size={15} />{recipe.dietaryTags[0] ?? 'balanced'}</span></div><h3>{recipe.name}</h3><p>{recipe.description}</p><button onClick={onOpen}>View recipe <ChevronRight size={16} /></button></div></article>
}
