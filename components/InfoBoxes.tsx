'use client'

import { Truck, Shield, RotateCcw } from 'lucide-react'

export default function InfoBoxes() {
  const infoItems = [
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Quick delivery to your doorstep with reliable shipping partners',
    },
    {
      icon: Shield,
      title: 'Secure Checkout',
      description: 'Your payment and personal information are always protected',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: 'Hassle-free returns within 30 days of purchase',
    },
  ]

  return (
    <section className="py-16 px-4 bg-background border-y border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="mb-4 p-3 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
