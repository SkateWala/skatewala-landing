'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import InfoBoxes from '@/components/InfoBoxes'
import FAQ from '@/components/FAQ'
import { useRouter } from 'next/navigation'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const router = useRouter()

  // ✅ createClient() called once outside useEffect
  const supabase = createClient()

  const fetchCategoryAndProducts = useCallback(async () => {
    setLoading(true)

    const { data: categoryData, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', params.slug)
      .single()

    // ✅ notFound() can't be called inside useEffect — redirect instead
    if (catError || !categoryData) {
      router.push('/404')
      return
    }

    setCategory(categoryData)

    let query = supabase
      .from('products')
      .select(
        `id, name, slug, price, discount_price, badge, created_at,
         product_images(image_url, alt_text, is_primary)`
      )
      .eq('category_id', categoryData.id)

    if (sortBy === 'newest') {
      query = query.order('created_at', { ascending: false })
    } else if (sortBy === 'price-low') {
      // ✅ sort by discount_price but fall back to price for nulls
      query = query.order('discount_price', { ascending: true, nullsFirst: false })
    } else if (sortBy === 'price-high') {
      query = query.order('price', { ascending: false })
    }

    const { data: productsData } = await query

    const productsWithImages = (productsData || []).map((product) => {
      const primaryImage =
        product.product_images?.find((img: any) => img.is_primary) ||
        product.product_images?.[0]
      return { ...product, image: primaryImage }
    })

    setProducts(productsWithImages)
    setLoading(false)
  }, [params.slug, sortBy]) // ✅ proper deps

  useEffect(() => {
    fetchCategoryAndProducts()
  }, [fetchCategoryAndProducts])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-secondary/50 border-b border-border py-8 px-4">
          <div className="container mx-auto">
            <a href="/" className="text-primary hover:underline text-sm mb-4 block">
              ← Back to Home
            </a>
            {/* ✅ Show skeleton while loading instead of nothing */}
            {loading ? (
              <div className="h-10 w-48 bg-secondary animate-pulse rounded-lg" />
            ) : category ? (
              <>
                <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-muted-foreground">{category.description}</p>
                )}
              </>
            ) : null}
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto">
            {!loading && products.length > 0 && (
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium text-foreground">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-secondary rounded-lg h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={parseFloat(product.price)}
                    discountPrice={
                      product.discount_price
                        ? parseFloat(product.discount_price)
                        : undefined
                    }
                    badge={product.badge}
                    image={
                      product.image
                        ? {
                            imageUrl: product.image.image_url,
                            altText: product.image.alt_text,
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        <InfoBoxes />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}