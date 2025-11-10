"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { ItemCard } from "@/components/item-card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { collection, query, where } from "firebase/firestore"
import type { Item } from "@/lib/data"


function ItemsDisplay() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "all"
  const firestore = useFirestore()

  const allItemsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return collection(firestore, "items")
  }, [firestore])
  
  const lostItemsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "items"), where("status", "==", "lost"))
  }, [firestore])

  const foundItemsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "items"), where("status", "==", "found"))
  }, [firestore])

  const { data: items, isLoading: allLoading } = useCollection<Item>(allItemsQuery)
  const { data: lostItems, isLoading: lostLoading } = useCollection<Item>(lostItemsQuery)
  const { data: foundItems, isLoading: foundLoading } = useCollection<Item>(foundItemsQuery)

  const isLoading = allLoading || lostLoading || foundLoading;

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-12">
      <Tabs defaultValue={type} className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
            {type === "lost"
              ? "Lost Items"
              : type === "found"
              ? "Found Items"
              : "All Items"}
          </h1>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
            <TabsTrigger value="found">Found</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items && items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lost">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {lostItems && lostItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="found">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {foundItems && foundItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


export default function ItemsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ItemsDisplay />
    </Suspense>
  )
}
