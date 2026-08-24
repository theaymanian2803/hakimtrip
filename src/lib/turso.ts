import { createClient, type Client } from '@libsql/client/web';
import type { Excursion, ExcursionInput } from '@/types/excursion';

const url = import.meta.env.VITE_TURSO_URL;
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

export const isTursoConfigured = Boolean(url && authToken);

let client: Client | null = null;

function getTursoClient(): Client {
  if (!isTursoConfigured) {
    throw new Error('Turso is not configured. Set VITE_TURSO_URL and VITE_TURSO_AUTH_TOKEN in your .env file.');
  }
  if (!client) {
    client = createClient({ url, authToken });
  }
  return client;
}

const CREATE_EXCURSIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS excursions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    images TEXT NOT NULL DEFAULT '[]',
    createdAt TEXT NOT NULL
  )
`;

export async function ensureExcursionsTable(): Promise<void> {
  await getTursoClient().execute(CREATE_EXCURSIONS_TABLE);
}

export const defaultExcursions: Excursion[] = [
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

export async function seedDefaultExcursions(): Promise<void> {
  for (const excursion of defaultExcursions) {
    await insertExcursion(excursion);
  }
}

function rowToExcursion(row: Record<string, unknown>): Excursion {
  return {
    id: String(row.id),
    title: String(row.title),
    price: Number(row.price),
    description: String(row.description),
    category: String(row.category),
    imageUrl: String(row.imageUrl),
    images: JSON.parse(String(row.images ?? '[]')),
    createdAt: String(row.createdAt),
  };
}

const SELECT_ALL = 'SELECT * FROM excursions ORDER BY createdAt DESC';

export async function fetchExcursions(): Promise<Excursion[]> {
  const result = await getTursoClient().execute(SELECT_ALL);
  return result.rows.map(rowToExcursion);
}

export async function insertExcursion(excursion: Excursion): Promise<void> {
  await getTursoClient().execute({
    sql: `
      INSERT INTO excursions (id, title, price, description, category, imageUrl, images, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      excursion.id,
      excursion.title,
      excursion.price,
      excursion.description,
      excursion.category,
      excursion.imageUrl,
      JSON.stringify(excursion.images),
      excursion.createdAt,
    ],
  });
}

export async function updateExcursionInDb(id: string, input: ExcursionInput): Promise<void> {
  await getTursoClient().execute({
    sql: `
      UPDATE excursions
      SET title = ?, price = ?, description = ?, category = ?, imageUrl = ?, images = ?
      WHERE id = ?
    `,
    args: [
      input.title,
      input.price,
      input.description,
      input.category,
      input.imageUrl,
      JSON.stringify(input.images),
      id,
    ],
  });
}

export async function deleteExcursionFromDb(id: string): Promise<void> {
  await getTursoClient().execute({
    sql: 'DELETE FROM excursions WHERE id = ?',
    args: [id],
  });
}