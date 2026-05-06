import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const supabase = await createClient()

    // Search products by name or description
    const { data: products } = await supabase
      .from('products')
      .select(
        `id, name, slug, price, discount_price, badge,
         product_images(image_url, alt_text, is_primary)`
      )
      .or(
        `name.ilike.%${query}%,description.ilike.%${query}%`
      )
      .limit(8)

    const results = (products || []).map((product) => {
      const primaryImage = product.product_images?.find(
        (img: any) => img.is_primary
      ) || product.product_images?.[0]
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        discountPrice: product.discount_price,
        badge: product.badge,
        image: primaryImage,
      }
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 })
  }
}
