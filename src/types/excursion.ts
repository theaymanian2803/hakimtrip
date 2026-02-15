export interface Excursion {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  images: string[];
  createdAt: string;
}

export type ExcursionInput = Omit<Excursion, 'id' | 'createdAt'>;
