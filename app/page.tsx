import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategorySlider from '@/components/CategorySlider'
import ProductCard from '@/components/ProductCard'
import InfoBoxes from '@/components/InfoBoxes'
import FAQ from '@/components/FAQ'
import { ArrowRight } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, description, image_url')
    .limit(8)

  // Fetch featured products (best sellers)
  const { data: featuredProducts } = await supabase
    .from('products')
    .select(
      `id, name, slug, price, discount_price, badge,
       categories(id, name, slug),
       product_images(image_url, alt_text, is_primary)`
    )
    .eq('badge', 'Best Seller')
    .limit(4)

  // Get primary image for each product
  const productsWithImages = (featuredProducts || []).map((product) => {
    const primaryImage = product.product_images?.find(
      (img: any) => img.is_primary
    ) || product.product_images?.[0]
    return {
      ...product,
      image: primaryImage,
    }
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto relative z-10 text-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider animate-pulse">
                  Welcome to Skatewala
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-tight animate-slide-up">
                Experience the
                <span className="block text-primary animate-text-shimmer">
                  Ride of Your Life
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Premium skateboards, longboards, and gear for riders who demand excellence
              </p>

              <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <a
                  href="#shop"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Info Boxes */}
        <InfoBoxes />

        {/* Shop Section */}
        <section id="shop" className="py-20 px-4">
          <div className="container mx-auto">
            {/* Categories Slider */}
            <div className="mb-20">
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 animate-fade-in">
                  Browse by Category
                </h2>
                <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Find exactly what you&apos;re looking for
                </p>
              </div>
              {categories && categories.length > 0 ? (
                <CategorySlider
                  categories={categories.map((cat: any) => ({
                    id: cat.id,
                    name: cat.name,
                    slug: cat.slug,
                    imageUrl: cat.image_url,
                    description: cat.description,
                  }))}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No categories available
                </div>
              )}
            </div>

            {/* Featured Products */}
            <div className="space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 animate-fade-in">
                    Featured Products
                  </h2>
                  <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Our best sellers and most popular items
                  </p>
                </div>
                <a
                  href="/products"
                  className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors"
                >
                  View All
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Products Grid */}
              {productsWithImages && productsWithImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {productsWithImages.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No featured products available
                </div>
              )}

              <div className="text-center pt-8 md:hidden">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  View All Products
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
