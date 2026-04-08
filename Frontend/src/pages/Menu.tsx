import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurantService } from '@/api/services/restaurantService'
import type { MenuItem } from '@/types/api'

const categoryOrder: Array<MenuItem['category']> = ['starter', 'main', 'dessert', 'drink']

export const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

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

  const grouped = useMemo(() => {
    const map = new Map<MenuItem['category'], MenuItem[]>()
    categoryOrder.forEach((category) => map.set(category, []))

    items.forEach((item) => {
      const list = map.get(item.category)
      if (list) list.push(item)
    })

    return map
  }, [items])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Our Menu</h1>
          <Link to="/" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800 transition-colors">
            Back Home
          </Link>
        </div>

        {loading && <p className="text-slate-300">Loading menu...</p>}

        {!loading && categoryOrder.map((category) => {
          const categoryItems = grouped.get(category) || []
          if (categoryItems.length === 0) return null

          return (
            <section key={category} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-amber-300 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categoryItems.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="h-44 w-full object-cover" loading="lazy" />
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <span className="font-bold text-emerald-300">Rs {item.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
