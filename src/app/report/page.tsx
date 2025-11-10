"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser, useFirestore, addDocumentNonBlocking, useAuth } from "@/firebase"
import { collection } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import type { Item } from "@/lib/data"

import { ImageUploader } from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ReportPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const firestore = useFirestore()
  const { toast } = useToast()

  const [status, setStatus] = useState(searchParams.get("type") || "")
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/seed/placeholder/400/300")
  const [imageHint, setImageHint] = useState("placeholder")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "You must be logged in to report an item.",
      });
      router.push("/login");
      return;
    }

    const itemsColRef = collection(firestore, 'items');
    const newItem: Omit<Item, 'id'> = {
      name,
      description,
      category,
      status: status as 'lost' | 'found',
      imageUrl,
      imageHint,
      location,
      date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      userId: user.uid,
    };
    
    // This will create a document with a random ID in the `items` collection
    const docRef = await addDocumentNonBlocking(itemsColRef, newItem);
    const userItemsColRef = collection(firestore, 'users', user.uid, 'items');
    // This will create a document with the same random ID in the user's `items` subcollection
    await addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'items'), { ...newItem, id: docRef.id });

    toast({
      title: "Report Submitted",
      description: "Your item report has been successfully submitted.",
    });

    router.push(`/items/${docRef.id}`);
  };


  return (
    <div className="container max-w-4xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Report an Item</CardTitle>
          <CardDescription>
            Fill out the details below to report a lost or found item.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="status">Item Status</Label>
                <Select name="status" value={status} onValueChange={setStatus} required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Is the item lost or found?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="keys">Keys</SelectItem>
                    <SelectItem value="wallets">Wallets</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name / Title</Label>
              <Input
                id="name"
                placeholder="e.g., Black leather wallet, iPhone 14 Pro"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide as much detail as possible. Include brand, color, distinguishing marks, etc."
                className="min-h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Last Known Location</Label>
              <Input
                id="location"
                placeholder="e.g., Main library, Central park bench"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Image</Label>
              <ImageUploader />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit">Submit Report</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
