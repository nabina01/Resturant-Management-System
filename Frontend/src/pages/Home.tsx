import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurantService } from '@/api/services/restaurantService'
import type { RestaurantInfo } from '@/types/api'

export const Home = () => {
  const [info, setInfo] = useState<RestaurantInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await restaurantService.getRestaurantInfo()
        setInfo(response)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#fde68a_0%,transparent_38%),radial-gradient(circle_at_82%_78%,#99f6e4_0%,transparent_42%),linear-gradient(135deg,#fff7ed_0%,#f8fafc_48%,#ecfeff_100%)] text-slate-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="rounded-3xl border border-white/60 bg-white/75 backdrop-blur-md shadow-2xl p-8 sm:p-12">
          <p className="inline-block rounded-full bg-amber-100 text-amber-800 font-semibold text-xs tracking-[0.15em] uppercase px-4 py-1">
            Welcome
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            {loading ? 'Loading restaurant...' : info?.name || 'Restaurant'}
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-teal-700 font-semibold">
            {info?.slogan || 'Fresh flavors made daily'}
          </p>

          <p className="mt-6 text-slate-700 max-w-3xl text-base sm:text-lg leading-relaxed">
            {info?.description || 'Discover our signature dishes and handcrafted beverages.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-700">
            <span className="rounded-full bg-white px-4 py-2 border border-slate-200">{info?.location || 'Location unavailable'}</span>
            <span className="rounded-full bg-white px-4 py-2 border border-slate-200">{info?.phone || 'Phone unavailable'}</span>
            <span className="rounded-full bg-white px-4 py-2 border border-slate-200">{info?.openHours || 'Hours unavailable'}</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white font-bold px-7 py-3 hover:bg-slate-700 transition-colors"
            >
              View Menu
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 text-slate-900 font-bold px-7 py-3 hover:bg-amber-300 transition-colors"
            >
              Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
