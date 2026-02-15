import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Excursion, ExcursionInput } from '@/types/excursion';

interface ExcursionsContextType {
  excursions: Excursion[];
  addExcursion: (input: ExcursionInput) => void;
  updateExcursion: (id: string, input: ExcursionInput) => void;
  deleteExcursion: (id: string) => void;
  getExcursion: (id: string) => Excursion | undefined;
}

const ExcursionsContext = createContext<ExcursionsContextType | undefined>(undefined);

const STORAGE_KEY = 'marrakech_escapes_excursions';

const defaultExcursions: Excursion[] = [
  {
    id: '1',
    title: 'Sahara Desert Adventure',
    price: 299,
    description: 'Experience the magic of the Sahara with a 3-day journey through golden dunes, camel trekking at sunset, and nights under the stars in a traditional Berber camp. Includes all meals, transport from Marrakech, and expert local guides.',
    category: 'Desert',
    imageUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?w=800&auto=format&fit=crop',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Atlas Mountains Day Trip',
    price: 89,
    description: 'Escape to the majestic Atlas Mountains for a day of breathtaking views, traditional Berber villages, and authentic mint tea. Visit the stunning Ourika Valley and enjoy lunch with panoramic mountain vistas.',
    category: 'Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Essaouira Coastal Escape',
    price: 79,
    description: 'Discover the charming coastal town of Essaouira with its blue and white medina, fresh seafood, and artistic heritage. Explore the ancient ramparts, browse artisan workshops, and enjoy the Atlantic breeze.',
    category: 'Coastal',
    imageUrl: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Marrakech Medina Walking Tour',
    price: 45,
    description: 'Navigate the enchanting maze of Marrakech\'s ancient medina with an expert local guide. Discover hidden riads, bustling souks, historic palaces, and the famous Jemaa el-Fnaa square as it comes alive.',
    category: 'City',
    imageUrl: 'https://images.unsplash.com/photo-1545296664-39db56ad95b3?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?w=800&auto=format&fit=crop',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Ouzoud Waterfalls Excursion',
    price: 65,
    description: 'Visit the spectacular Ouzoud Waterfalls, the highest in North Africa. Trek through olive groves, spot Barbary macaques, take a boat ride to the base of the falls, and enjoy a traditional tagine lunch.',
    category: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Moroccan Cooking Class',
    price: 55,
    description: 'Learn the secrets of Moroccan cuisine in a traditional riad kitchen. Shop for fresh ingredients in the souk, master the art of tagine and couscous, and enjoy your creations in a beautiful courtyard setting.',
    category: 'Culinary',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
    ],
    createdAt: new Date().toISOString(),
  },
];

export function ExcursionsProvider({ children }: { children: ReactNode }) {
  const [excursions, setExcursions] = useState<Excursion[]>(() => {
    if (typeof window === 'undefined') return defaultExcursions;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultExcursions;
      }
    }
    return defaultExcursions;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(excursions));
  }, [excursions]);

  const addExcursion = (input: ExcursionInput) => {
    const newExcursion: Excursion = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setExcursions(prev => [newExcursion, ...prev]);
  };

  const updateExcursion = (id: string, input: ExcursionInput) => {
    setExcursions(prev =>
      prev.map(exc =>
        exc.id === id ? { ...exc, ...input } : exc
      )
    );
  };

  const deleteExcursion = (id: string) => {
    setExcursions(prev => prev.filter(exc => exc.id !== id));
  };

  const getExcursion = (id: string) => {
    return excursions.find(exc => exc.id === id);
  };

  return (
    <ExcursionsContext.Provider value={{ excursions, addExcursion, updateExcursion, deleteExcursion, getExcursion }}>
      {children}
    </ExcursionsContext.Provider>
  );
}

export function useExcursions() {
  const context = useContext(ExcursionsContext);
  if (context === undefined) {
    throw new Error('useExcursions must be used within an ExcursionsProvider');
  }
  return context;
}
