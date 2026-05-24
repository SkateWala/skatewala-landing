import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfoBoxes from '@/components/InfoBoxes'
import FAQ from '@/components/FAQ'
import ProductCard from '@/components/ProductCard'
import ProductDetailGallery from '@/components/ProductDetailGallery'
import { MessageCircle, Heart, Share2 } from 'lucide-react'

type ProductImage = {
  id: number
  image_url: string
  alt_text: string
  is_primary: boolean
  display_order: number
}

type Category = {
  name: string
  slug: string
}

type Product = {
  id: number
  name: string
  slug: string
  description: string | null
  price: number
  discount_price: number | null
  stock: number
  badge: string | null
  category_id: number
  categories: Category | Category[] | null  // Supabase can return object or array
  product_images: ProductImage[]
}

type RelatedProduct = {
  id: number
  name: string
  slug: string
  price: number
  discount_price: number | null
  badge: string | null
  product_images: Pick<ProductImage, 'image_url' | 'alt_text' | 'is_primary'>[]
  image?: Pick<ProductImage, 'image_url' | 'alt_text'>
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>   // ← Promise type
}) {
  const { slug } = await params        // ← await it
 
  const supabase = await createClient()
  console.log('Fetching product with slug:', slug)
  const { data: productData, error } = await supabase
    .from('products')
    .select(
      `id, name, slug, description, price, discount_price, stock, badge, category_id,
       categories(name, slug),
       product_images(id, image_url, alt_text, is_primary, display_order)`
    )
    .eq('slug', slug)
    .single()
    console.log('slug:', slug)
console.log('data:', productData)
console.log('error:', error)
  if (error || !productData) notFound()

  // Normalize: Supabase may return categories as array or object
  const product = productData as unknown as Product
  const category = Array.isArray(product.categories)
    ? product.categories[0] ?? null
    : product.categories

  const { data: relatedData } = await supabase
    .from('products')
    .select(
      `id, name, slug, price, discount_price, badge,
       product_images(image_url, alt_text, is_primary)`
    )
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(4)

  const images = [...(product.product_images ?? [])].sort(
    (a, b) => a.display_order - b.display_order
  )

  const relatedProductsWithImages: RelatedProduct[] = (relatedData ?? []).map((p: any) => {
    const primaryImage =
      p.product_images?.find((img: any) => img.is_primary) ??
      p.product_images?.[0]
    return { ...p, image: primaryImage }
  })

  const savings = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : null

  const displayPrice = product.discount_price ?? product.price

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} (₹${displayPrice}). Can you tell me more about it?`
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="border-b border-border py-4 px-4 bg-secondary/40">
          <div className="container mx-auto flex gap-2 text-sm">
            <a href="/" className="text-primary hover:underline font-medium">Home</a>
            <span className="text-muted-foreground">/</span>
            <a href="/products" className="text-primary hover:underline font-medium">Products</a>
            <span className="text-muted-foreground">/</span>
            {category && (
              <>
                <a
                  href={`/category/${category.slug}`}
                  className="text-primary hover:underline font-medium"
                >
                  {category.name}
                </a>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-foreground font-semibold">{product.name}</span>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              <ProductDetailGallery
                images={images}
                productName={product.name}
                whatsappMessage={whatsappMessage}
              />

              <div className="flex flex-col space-y-6">
                {category && (
                  <div>
                    <a
                      href={`/category/${category.slug}`}
                      className="inline-block text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {category.name}
                    </a>
                  </div>
                )}

                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">
                    {product.name}
                  </h1>
                  {product.badge && (
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg text-amber-400">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(No reviews yet)</span>
                </div>

                <div className="py-8 border-y border-border space-y-4">
                  <div className="flex items-end gap-4">
                    <span className="text-6xl font-bold text-primary">
                      ₹{displayPrice.toFixed(2)}
                    </span>
                    {product.discount_price && (
                      <div className="flex flex-col gap-2">
                        <span className="text-2xl text-muted-foreground line-through">
                          ₹{product.price.toFixed(2)}
                        </span>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                          Save {savings}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    {product.stock > 0 ? (
                      <p className="text-base text-green-600 font-semibold flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                        In Stock ({product.stock} available)
                      </p>
                    ) : (
                      <p className="text-base text-red-600 font-semibold">Out of Stock</p>
                    )}
                  </div>
                </div>

                {product.description && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">About This Product</h3>
                    <p className="text-foreground/80 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="space-y-4 pt-4">
                  <a
                    href={`https://wa.me/?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-xl hover:scale-105 transition-all duration-200 text-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Order on WhatsApp
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="border-2 border-primary text-primary py-3 px-4 rounded-xl font-semibold hover:bg-primary/10 transition-all duration-200 flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button className="border-2 border-border text-foreground py-3 px-4 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {relatedProductsWithImages.length > 0 && (
              <section className="border-t border-border pt-20">
                <div className="mb-12">
                  <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                    More from {category?.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Check out other products in this category
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProductsWithImages.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      slug={p.slug}
                      price={parseFloat(String(p.price))}
                      discountPrice={
                        p.discount_price ? parseFloat(String(p.discount_price)) : undefined
                      }
                      badge={p.badge ?? undefined}
                      image={
                        p.image
                          ? { imageUrl: p.image.image_url, altText: p.image.alt_text }
                          : undefined
                      }
                    />
                  ))}
                </div>
              </section>
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