import { PlaceHolderImages } from "./placeholder-images";

export type Item = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'lost' | 'found' | 'claimed';
  imageUrl: string;
  imageHint: string;
  location: string;
  date: string;
  userId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type Claim = {
  id: string;
  itemId: string;
  itemName: string;
  claimantId: string;
  claimantName: string;
  status: 'pending' | 'approved' | 'rejected';
  claimDate: string;
};

export const users: User[] = [
  { id: 'user-1', name: 'Alice', email: 'alice@example.com', role: 'user' },
  { id: 'user-2', name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 'admin-1', name: 'Charlie', email: 'charlie@example.com', role: 'admin' },
];

export const items: Item[] = [
  {
    id: 'item-1',
    name: 'Brown Leather Wallet',
    description: 'A classic bifold wallet, slightly worn. Contained a library card and some cash. Lost near the main library.',
    category: 'Wallets',
    status: 'lost',
    imageUrl: PlaceHolderImages.find(p => p.id === 'wallet')?.imageUrl || 'https://picsum.photos/seed/wallet/400/300',
    imageHint: 'leather wallet',
    location: 'Main Library',
    date: '2024-07-15',
    userId: 'user-1',
  },
  {
    id: 'item-2',
    name: 'House Keys',
    description: 'A set of three keys on a blue lanyard with a small keychain toy. Found on a bench in the central park.',
    category: 'Keys',
    status: 'found',
    imageUrl: PlaceHolderImages.find(p => p.id === 'keys')?.imageUrl || 'https://picsum.photos/seed/keys/400/300',
    imageHint: 'house keys',
    location: 'Central Park',
    date: '2024-07-18',
    userId: 'user-2',
  },
  {
    id: 'item-3',
    name: 'iPhone 13',
    description: 'Black iPhone 13 with a small crack on the top left corner of the screen. In a clear case. Lost in the student union building.',
    category: 'Electronics',
    status: 'lost',
    imageUrl: PlaceHolderImages.find(p => p.id === 'phone')?.imageUrl || 'https://picsum.photos/seed/phone/400/300',
    imageHint: 'smartphone cracked',
    location: 'Student Union',
    date: '2024-07-20',
    userId: 'user-1',
  },
  {
    id: 'item-4',
    name: 'Grey Backpack',
    description: 'A simple grey Jansport backpack. A water bottle was in the side pocket and it felt heavy. Found in lecture hall 3B.',
    category: 'Bags',
    status: 'found',
    imageUrl: PlaceHolderImages.find(p => p.id === 'backpack')?.imageUrl || 'https://picsum.photos/seed/backpack/400/300',
    imageHint: 'grey backpack',
    location: 'Lecture Hall 3B',
    date: '2024-07-21',
    userId: 'user-2',
  },
  {
    id: 'item-5',
    name: 'Wireless Headphones',
    description: 'White wireless earbuds in a white charging case. Brand name is visible. Lost on the city bus, route 5.',
    category: 'Electronics',
    status: 'lost',
    imageUrl: PlaceHolderImages.find(p => p.id === 'headphones')?.imageUrl || 'https://picsum.photos/seed/headphones/400/300',
    imageHint: 'wireless headphones',
    location: 'City Bus Route 5',
    date: '2024-07-19',
    userId: 'user-1',
  },
  {
    id: 'item-6',
    name: 'Silver Laptop',
    description: '13-inch silver laptop with a circular sticker on the lid. Found in the coffee shop downtown.',
    category: 'Electronics',
    status: 'found',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop')?.imageUrl || 'https://picsum.photos/seed/laptop/400/300',
    imageHint: 'silver laptop',
    location: 'Downtown Coffee Shop',
    date: '2024-07-22',
    userId: 'user-2',
  },
];

export const claims: Claim[] = [
    {
        id: 'claim-1',
        itemId: 'item-2',
        itemName: 'House Keys',
        claimantId: 'user-1',
        claimantName: 'Alice',
        status: 'pending',
        claimDate: '2024-07-20',
    },
    {
        id: 'claim-2',
        itemId: 'item-4',
        itemName: 'Grey Backpack',
        claimantId: 'user-1',
        claimantName: 'Alice',
        status: 'approved',
        claimDate: '2024-07-22',
    },
     {
        id: 'claim-3',
        itemId: 'item-6',
        itemName: 'Silver Laptop',
        claimantId: 'user-1',
        claimantName: 'Alice',
        status: 'rejected',
        claimDate: '2024-07-23',
    }
]
