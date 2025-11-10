"use client"

import Image from "next/image"
import Link from "next/link"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import type { Item } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { collection, query, where, limit } from "firebase/firestore"

export default function Home() {
  const firestore = useFirestore()

  const recentLostItemsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(
      collection(firestore, "items"),
      where("status", "==", "lost"),
      limit(5)
    )
  }, [firestore])
  
  const recentFoundItemsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(
      collection(firestore, "items"),
      where("status", "==", "found"),
      limit(5)
    )
  }, [firestore])

  const { data: recentLostItems } = useCollection<Item>(recentLostItemsQuery)
  const { data: recentFoundItems } = useCollection<Item>(recentFoundItemsQuery)

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover object-center brightness-50"
              priority
            />
          )}
          <div className="relative z-10 p-4 space-y-4 text-primary-foreground">
            <h1 className="text-4xl font-headline tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Find What's Lost, Reunite What's Found
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl font-body">
              Our community-powered platform helps you recover your lost belongings and report items you've found.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" variant="default">
                <Link href="/report?type=lost">Report a Lost Item</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/report?type=found">I Found an Item</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section id="recent-lost" className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-center mb-8">
              Recently Lost
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recentLostItems && recentLostItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
             <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/items?type=lost">View All Lost Items</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="recent-found" className="py-12 md:py-24 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-center mb-8">
              Recently Found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recentFoundItems && recentFoundItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
             <div className="text-center mt-8">
              <Button asChild>
                <Link href="/items?type=found">View All Found Items</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <footer className="bg-background border-t">
          <div className="container py-6 text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} FindMyStuff. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
