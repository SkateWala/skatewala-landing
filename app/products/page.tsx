'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import InfoBoxes from '@/components/InfoBoxes'
import FAQ from '@/components/FAQ'
import { ArrowUpDown } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState('newest')

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name')

      setCategories(categoriesData || [])

      // Fetch products with filters
      let query = supabase
        .from('products')
        .select(
          `id, name, slug, price, discount_price, badge, created_at,
           category_id, categories(name, slug),
           product_images(image_url, alt_text, is_primary)`
        )

      // Apply category filter
      if (selectedCategory) {
        query = query.eq('categories.slug', selectedCategory)
      }

      // Apply price filter
      // query = query
      //   .gte('discount_price', priceRange[0])
      //   .lte('price', priceRange[1])

      // Apply sorting
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false })
      } else if (sortBy === 'price-low') {
        query = query.order('discount_price', { ascending: true, nullsFirst: false })
      } else if (sortBy === 'price-high') {
        query = query.order('price', { ascending: false })
      } else if (sortBy === 'popular') {
        query = query.order('name', { ascending: true })
      }

      const { data: productsData } = await query.limit(100)

      // Add primary images to products
      const productsWithImages = (productsData || []).map((product) => {
        const primaryImage = product.product_images?.find(
          (img: any) => img.is_primary
        ) || product.product_images?.[0]
        return {
          ...product,
          image: primaryImage,
        }
      })

      setProducts(productsWithImages)
      setLoading(false)
    }

    fetchData()
  }, [selectedCategory, priceRange, sortBy])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-secondary/50 border-b border-border py-8 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              All Products
            </h1>
            <p className="text-muted-foreground">
              Discover our complete collection of skateboarding gear
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {products.length} products
                  </p>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="sort"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <ArrowUpDown className="w-4 h-4" />
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
                      <option value="popular">Popular</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-secondary rounded-lg h-80 animate-pulse"
                      />
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      No products found matching your criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory(undefined)
                        setPriceRange([0, 1000])
                      }}
                      className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Info Boxes */}
        {/* <InfoBoxes /> */}

        {/* FAQ */}
        {/* <FAQ /> */}

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
