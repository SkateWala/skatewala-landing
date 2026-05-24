'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface Category {
  id: number
  name: string
  slug: string
}

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory?: string
  onCategoryChange: (slug: string | undefined) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['categories', 'price'])
  )

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  return (
    <aside className="w-full lg:w-64 space-y-4">
      {/* Categories Filter */}
      <div className="bg-card rounded-lg border border-border">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
        >
          <h3 className="font-semibold text-foreground">Categories</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.has('categories') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSections.has('categories') && (
          <div className="px-4 py-3 space-y-2 border-t border-border">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value=""
                checked={!selectedCategory}
                onChange={() => onCategoryChange(undefined)}
                className="w-4 h-4 text-primary cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                All Categories
              </span>
            </label>

            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={selectedCategory === category.slug}
                  onChange={() => onCategoryChange(category.slug)}
                  className="w-4 h-4 text-primary cursor-pointer"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-card rounded-lg border border-border">
        <button
          onClick={() => toggleSection('price')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
        >
          <h3 className="font-semibold text-foreground">Price Range</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.has('price') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSections.has('price') && (
          <div className="px-4 py-3 space-y-4 border-t border-border">
            <div>
              <label className="text-sm text-foreground block mb-2">
                Min: ${priceRange[0]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  onPriceChange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <label className="text-sm text-foreground block mb-2">
                Max: ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceChange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <button
              onClick={() => onPriceChange([0, 1000])}
              className="w-full text-sm text-primary hover:text-primary/80 transition-colors py-2"
            >
              Reset Price
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
