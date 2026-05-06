import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfoBoxes from '@/components/InfoBoxes'
import FAQ from '@/components/FAQ'
import ProductCard from '@/components/ProductCard'
import ProductDetailGallery from '@/components/ProductDetailGallery'
import { MessageCircle, Heart, Share2 } from 'lucide-react'

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()

  // Fetch product details
  const { data: product } = await supabase
    .from('products')
    .select(
      `id, name, slug, description, price, discount_price, stock, badge, category_id,
       categories(name, slug),
       product_images(id, image_url, alt_text, is_primary, display_order)`
    )
    .eq('slug', params.slug)
    .single()

  if (!product) {
    notFound()
  }

  // Fetch related products from same category
  const { data: relatedProducts } = await supabase
    .from('products')
    .select(
      `id, name, slug, price, discount_price, badge,
       product_images(image_url, alt_text, is_primary)`
    )
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(4)

  // Sort images by display order
  const images = (product.product_images || []).sort(
    (a: any, b: any) => a.display_order - b.display_order
  )

  const relatedProductsWithImages = (relatedProducts || []).map((p: any) => {
    const primaryImage = p.product_images?.find((img: any) => img.is_primary) ||
      p.product_images?.[0]
    return {
      ...p,
      image: primaryImage,
    }
  })

  const savings = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : null

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} (${product.discount_price ? `₹${product.discount_price}` : `₹${product.price}`}). Can you tell me more about it?`
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="border-b border-border py-4 px-4 bg-secondary/40">
          <div className="container mx-auto flex gap-2 text-sm">
            <a href="/" className="text-primary hover:underline font-medium">
              Home
            </a>
            <span className="text-muted-foreground">/</span>
            <a href="#" className="text-primary hover:underline font-medium">
              Products
            </a>
            <span className="text-muted-foreground">/</span>
            <a
              href={`/category/${product.categories?.slug}`}
              className="text-primary hover:underline font-medium"
            >
              {product.categories?.name}
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">{product.name}</span>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              {/* Product Gallery - Click to Open Modal */}
              <ProductDetailGallery
                images={images}
                productName={product.name}
                whatsappMessage={whatsappMessage}
              />

              {/* Product Info */}
              <div className="flex flex-col space-y-6">
                {/* Category Badge */}
                {product.categories && (
                  <div>
                    <a
                      href={`/category/${product.categories.slug}`}
                      className="inline-block text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {product.categories.name}
                    </a>
                  </div>
                )}

                {/* Title */}
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">
                    {product.name}
                  </h1>
                  {product.badge && (
                    <div className="flex gap-2">
                      <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating Placeholder */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg text-amber-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(No reviews yet)</span>
                </div>

                {/* Price Section */}
                <div className="py-8 border-y border-border space-y-4">
                  <div className="flex items-end gap-4">
                    <span className="text-6xl font-bold text-primary">
                      ₹{product.discount_price ? product.discount_price.toFixed(2) : product.price.toFixed(2)}
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

                  {/* Stock Status */}
                  <div>
                    {product.stock > 0 ? (
                      <p className="text-base text-green-600 font-semibold flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                        In Stock ({product.stock} available)
                      </p>
                    ) : (
                      <p className="text-base text-red-600 font-semibold">Out of Stock</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      About This Product
                    </h3>
                    <p className="text-foreground/80 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
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
                    <button className="border-2 border-primary text-primary py-3 px-4 rounded-xl font-semibold hover:bg-primary/10 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md">
                      <Heart className="w-5 h-5" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button className="border-2 border-border text-foreground py-3 px-4 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md">
                      <Share2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProductsWithImages && relatedProductsWithImages.length > 0 && (
              <section className="border-t border-border pt-20">
                <div className="mb-12">
                  <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                    More from {product.categories?.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Check out other products in this category that might interest you
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProductsWithImages.map((relatedProduct) => (
                    <ProductCard
                      key={relatedProduct.id}
                      id={relatedProduct.id}
                      name={relatedProduct.name}
                      slug={relatedProduct.slug}
                      price={parseFloat(relatedProduct.price)}
                      discountPrice={
                        relatedProduct.discount_price
                          ? parseFloat(relatedProduct.discount_price)
                          : undefined
                      }
                      badge={relatedProduct.badge}
                      image={
                        relatedProduct.image
                          ? {
                              imageUrl: relatedProduct.image.image_url,
                              altText: relatedProduct.image.alt_text,
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>

        {/* Info Boxes */}
        <InfoBoxes />

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
