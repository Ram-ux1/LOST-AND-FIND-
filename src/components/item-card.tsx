import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, GripVertical } from "lucide-react"

import type { Item } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

type ItemCardProps = {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/items/${item.id}`} className="block">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.name}
              data-ai-hint={item.imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
             <Badge variant={item.status === 'lost' ? 'destructive' : 'secondary'} className="capitalize shrink-0 absolute top-2 right-2">
              {item.status}
            </Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="font-headline text-lg mb-2 leading-tight">
          <Link href={`/items/${item.id}`}>{item.name}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground p-4 pt-0">
         <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{item.date}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
