import Link from "next/link"

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
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="status">Item Status</Label>
                <Select name="status">
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
                <Select name="category">
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide as much detail as possible. Include brand, color, distinguishing marks, etc."
                className="min-h-32"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Last Known Location</Label>
              <Input
                id="location"
                placeholder="e.g., Main library, Central park bench"
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
