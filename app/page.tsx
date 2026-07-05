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

export default function Home() {
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



// import { createClient } from '@/lib/supabase/server'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
// import CategorySlider from '@/components/CategorySlider'
// import ProductCard from '@/components/ProductCard'
// import InfoBoxes from '@/components/InfoBoxes'
// import FAQ from '@/components/FAQ'
// import { ArrowRight } from 'lucide-react'

// // ✅ Map category slugs to local public images as fallback
// const CATEGORY_IMAGE_MAP: Record<string, string> = {
//   skating: '/skating.jpeg',
// }

// export default async function Home() {
//   const supabase = await createClient()

//   // Fetch categories
//   const { data: categories, error: catError } = await supabase
//     .from('categories')
//     .select('id, name, slug, description, image_url')
//     .order('name', { ascending: true })
//     .limit(8)

//   console.log('categories data:', categories)
//   console.log('categories error:', catError)

//   const { data: featuredProducts, error: prodError } = await supabase
//     .from('products')
//     .select(
//       `id, name, slug, price, discount_price, badge,
//        categories(id, name, slug),
//        product_images(image_url, alt_text, is_primary)`
//     )
//     .limit(4)

//   console.log('products data:', featuredProducts)
//   console.log('products error:', prodError)

//   // Get primary image for each product
//   const productsWithImages = (featuredProducts || []).map((product) => {
//     const primaryImage =
//       product.product_images?.find((img: any) => img.is_primary) ||
//       product.product_images?.[0]
//     return { ...product, image: primaryImage }
//   })

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-background">
//         {/* Hero Section */}
//         <section className="relative h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
//             <div
//               className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
//               style={{ animationDelay: '2s' }}
//             />
//           </div>

//           <div className="container mx-auto relative z-10 text-center">
//             <div className="space-y-6 animate-fade-in">
//               <div className="inline-block">
//                 <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider animate-pulse">
//                   Welcome to Skatewala
//                 </span>
//               </div>

//               <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-tight animate-slide-up">
//                 Experience the
//                 <span className="block text-primary animate-text-shimmer">
//                   Ride of Your Life
//                 </span>
//               </h1>

//               <p
//                 className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up"
//                 style={{ animationDelay: '0.2s' }}
//               >
//                 Premium skateboards, longboards, and gear for riders who demand excellence
//               </p>

//               <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                
//                   <a href="#shop"
//                   className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
//                 >
//                   Explore Products
//                   <ArrowRight className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Info Boxes */}
//         <InfoBoxes />

//         {/* Shop Section */}
//         <section id="shop" className="py-20 px-4">
//           <div className="container mx-auto">

//             {/* Categories Slider */}
//             <div className="mb-20">
//               <div className="mb-8">
//                 <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 animate-fade-in">
//                   Browse by Category
//                 </h2>
//                 <p
//                   className="text-lg text-muted-foreground animate-fade-in"
//                   style={{ animationDelay: '0.1s' }}
//                 >
//                   Find exactly what you&apos;re looking for
//                 </p>
//               </div>

//               {categories && categories.length > 0 ? (
//                 <CategorySlider
//                   categories={categories.map((cat) => ({
//                     id: cat.id,
//                     name: cat.name,
//                     slug: cat.slug,
//                     description: cat.description,
//                     // ✅ Use image_url from DB if it exists,
//                     //    otherwise fall back to local public image by slug,
//                     //    otherwise undefined
//                     imageUrl:
//                       cat.image_url ||
//                       CATEGORY_IMAGE_MAP[cat.slug] ||
//                       undefined,
//                   }))}
//                 />
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No categories available
//                 </div>
//               )}
//             </div>

//             {/* Featured Products */}
//             <div className="space-y-8">
//               <div className="flex items-end justify-between">
//                 <div>
//                   <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 animate-fade-in">
//                     Featured Products
//                   </h2>
//                   <p
//                     className="text-lg text-muted-foreground animate-fade-in"
//                     style={{ animationDelay: '0.1s' }}
//                   >
//                     Our best sellers and most popular items
//                   </p>
//                 </div>
                
//                   <a href="/products"
//                   className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors"
//                 >
//                   View All
//                   <ArrowRight className="w-5 h-5" />
//                 </a>
//               </div>

//               {productsWithImages.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {productsWithImages.map((product, index) => (
//                     <div
//                       key={product.id}
//                       className="animate-fade-in"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       <ProductCard
//                         id={product.id}
//                         name={product.name}
//                         slug={product.slug}
//                         price={parseFloat(product.price)}
//                         discountPrice={
//                           product.discount_price
//                             ? parseFloat(product.discount_price)
//                             : undefined
//                         }
//                         badge={product.badge}
//                         image={
//                           product.image
//                             ? {
//                                 imageUrl: product.image.image_url,
//                                 altText: product.image.alt_text,
//                               }
//                             : undefined
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No featured products available
//                 </div>
//               )}

//               <div className="text-center pt-8 md:hidden">
                
//                   <a href="/products"
//                   className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
//                 >
//                   View All Products
//                   <ArrowRight className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

        
//         <FAQ />

      
//         <Footer />
//       </main>
//     </>
//   )
// }