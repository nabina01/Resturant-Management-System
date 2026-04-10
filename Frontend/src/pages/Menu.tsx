import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurantService } from '@/api/services/restaurantService'
import type { MenuItem } from '@/types/api'

type SortMode = 'menu-order' | 'price-asc' | 'price-desc'
type SectionKey = 'coffee' | 'tea' | 'shakes' | 'coolers' | 'dessert' | 'soft' | 'starter' | 'main' | 'other'

const sectionOrder: SectionKey[] = ['coffee', 'tea', 'shakes', 'coolers', 'dessert', 'soft', 'starter', 'main', 'other']

const sectionLabel: Record<SectionKey, string> = {
  coffee: 'Coffee',
  tea: 'Tea',
  shakes: 'Milkshakes & Lassi',
  coolers: 'Fresh Juices & Coolers',
  dessert: 'Bakery & Desserts',
  soft: 'Soft Drinks',
  starter: 'Starters',
  main: 'Main Course',
  other: 'Other Drinks',
}

const preferredItemOrder: Partial<Record<SectionKey, string[]>> = {
  coffee: ['Americano', 'Cappuccino', 'Latte', 'Espresso Coffee', 'Macchiato', 'Iced Coffee'],
  tea: ['Black Tea', 'Green Tea', 'Lemon Tea', 'Iced Lemon Tea', 'Peach Iced Tea'],
  shakes: ['Chocolate Milkshake', 'Strawberry Milkshake', 'Vanilla Milkshake', 'Mango Lassi', 'Sweet Lassi'],
  coolers: ['Lemonade', 'Orange Pineapple', 'Mango Smoothie', 'Strawberry Lemon Cooler'],
  dessert: ['Croissant', 'Muffin', 'Brownie', 'Donut', 'Cookie'],
  soft: ['Coke', 'Sprite', 'Pepsi', 'Dew', 'Frooti'],
  starter: ['French Fries'],
  main: ['Burger', 'Cheese Pasta', 'Pizza', 'Sandwich', 'Classic Sandwich'],
}

type DisplaySection = {
  key: SectionKey
  label: string
  items: MenuItem[]
}

function normalizeCategory(rawCategory: string): MenuItem['category'] | null {
  const normalized = rawCategory.trim().toLowerCase()

  if (normalized === 'drink' || normalized === 'drinks' || normalized === 'beverage' || normalized === 'beverages') {
    return 'drink'
  }

  if (normalized === 'starter' || normalized === 'main' || normalized === 'dessert') {
    return normalized
  }

  return null
}

function inferDrinkGroup(name: string): Extract<SectionKey, 'coffee' | 'tea' | 'shakes' | 'coolers' | 'soft' | 'other'> {
  const value = name.toLowerCase()

  if (
    value.includes('coffee') ||
    value.includes('espresso') ||
    value.includes('latte') ||
    value.includes('cappuccino') ||
    value.includes('americano') ||
    value.includes('macchiato') ||
    value.includes('mocha') ||
    value.includes('affogato') ||
    value.includes('frappuccino')
  ) {
    return 'coffee'
  }

  if (value.includes('tea')) {
    return 'tea'
  }

  if (value.includes('milkshake') || value.includes('smoothie') || value.includes('lassi')) {
    return 'shakes'
  }

  if (value.includes('cooler') || value.includes('lemonade') || value.includes('punch') || value.includes('lemon')) {
    return 'coolers'
  }

  if (
    value.includes('coke') ||
    value.includes('pepsi') ||
    value.includes('sprite') ||
    value.includes('dew') ||
    value.includes('frooti') ||
    value.includes('soda')
  ) {
    return 'soft'
  }

  return 'other'
}

function sortSectionItems(items: MenuItem[], key: SectionKey, sortMode: SortMode): MenuItem[] {
  if (sortMode === 'price-asc') {
    return [...items].sort((a, b) => a.price - b.price)
  }

  if (sortMode === 'price-desc') {
    return [...items].sort((a, b) => b.price - a.price)
  }

  const orderedNames = preferredItemOrder[key] ?? []
  const rankMap = new Map(orderedNames.map((name, index) => [name.toLowerCase(), index]))

  return [...items].sort((a, b) => {
    const rankA = rankMap.get(a.name.toLowerCase())
    const rankB = rankMap.get(b.name.toLowerCase())

    if (rankA !== undefined && rankB !== undefined) {
      return rankA - rankB
    }

    if (rankA !== undefined) return -1
    if (rankB !== undefined) return 1

    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })
}

export const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [sortMode, setSortMode] = useState<SortMode>('menu-order')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await restaurantService.getMenu()
        setItems(response)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const menuSections = useMemo<DisplaySection[]>(() => {
    const cleaned = items
      .map((item) => {
        const normalizedCategory = normalizeCategory(item.category)
        if (!normalizedCategory) return null
        return { ...item, category: normalizedCategory }
      })
      .filter((item): item is MenuItem => item !== null)

    const keyword = searchTerm.trim().toLowerCase()

    const filtered = keyword
      ? cleaned.filter((item) => {
          const text = `${item.name} ${item.description} ${item.category}`.toLowerCase()
          return text.includes(keyword)
        })
      : cleaned

    const groupedSections: Record<SectionKey, MenuItem[]> = {
      coffee: [],
      tea: [],
      shakes: [],
      coolers: [],
      dessert: [],
      soft: [],
      starter: [],
      main: [],
      other: [],
    }

    filtered.forEach((item) => {
      if (item.category === 'drink') {
        const group = inferDrinkGroup(item.name)
        groupedSections[group].push(item)
        return
      }

      if (item.category === 'starter') groupedSections.starter.push(item)
      if (item.category === 'main') groupedSections.main.push(item)
      if (item.category === 'dessert') groupedSections.dessert.push(item)
    })

    return sectionOrder
      .map((key) => ({
        key,
        label: sectionLabel[key],
        items: sortSectionItems(groupedSections[key], key, sortMode),
      }))
      .filter((section) => section.items.length > 0)
  }, [items, sortMode, searchTerm])

  return (
    <div className="min-h-screen bg-[#f2ede4] text-[#1f2937]">
      <div className="w-full px-2 sm:px-3 lg:px-4 py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Menu</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Browse our delicious items</p>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search menu items... (try 'cof', 'tea', 'choc')"
            className="w-full rounded-lg border border-[#d6c6b3] bg-[#f7f2e9] px-4 py-2.5 text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#b8804c]"
          />

          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            className="rounded-lg border border-[#d6c6b3] bg-[#f7f2e9] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8804c]"
          >
            <option value="menu-order">Menu Order</option>
            <option value="price-asc">Low-High</option>
            <option value="price-desc">High-Low</option>
          </select>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-[#d6c6b3] bg-[#f7f2e9] px-4 py-2.5 text-sm font-medium hover:bg-[#efe4d6] transition-colors"
          >
            Back Home
          </Link>
        </div>

        {loading && <p className="text-[#6b7280]">Loading menu...</p>}

        {!loading && menuSections.length === 0 && (
          <p className="text-[#6b7280]">No items found for your search.</p>
        )}

        {!loading && menuSections.map((section) => (
          <section key={section.key} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-[#1f2937]">
              {section.label} <span className="text-sm font-medium text-[#6b7280]">({section.items.length} items)</span>
            </h2>

            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '20px',
                alignItems: 'stretch',
              }}
            >
              {section.items.map((item) => (
                <article
                  key={item.id}
                  className="group"
                  style={{
                    width: '100%',
                    minHeight: '390px',
                    border: '1px solid #b8804c',
                    borderRadius: '12px',
                    backgroundColor: '#dfd1be',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ backgroundColor: '#e6e0d5', padding: '12px' }}>
                    <div
                      style={{
                        height: '210px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid #c9b19a',
                        backgroundColor: '#e5e7eb',
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 className="text-base font-semibold text-[#1f2937]">{item.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#6b7280]" style={{ minHeight: '56px' }}>{item.description}</p>

                    <div className="pt-3 flex items-center justify-between" style={{ marginTop: 'auto' }}>
                      <p className="text-sm font-bold text-[#7c4a28]">Rs.{item.price}</p>
                      <button
                        type="button"
                        className="rounded-md bg-[#7b563a] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#66462f] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
