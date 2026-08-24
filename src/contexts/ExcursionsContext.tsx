import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { Excursion, ExcursionInput } from '@/types/excursion';
import {
  ensureExcursionsTable,
  fetchExcursions,
  insertExcursion,
  updateExcursionInDb,
  deleteExcursionFromDb,
  seedDefaultExcursions,
  isTursoConfigured,
} from '@/lib/turso';

interface ExcursionsContextType {
  excursions: Excursion[];
  isLoading: boolean;
  error: string | null;
  addExcursion: (input: ExcursionInput) => Promise<Excursion>;
  updateExcursion: (id: string, input: ExcursionInput) => Promise<void>;
  deleteExcursion: (id: string) => Promise<void>;
  getExcursion: (id: string) => Excursion | undefined;
}

const ExcursionsContext = createContext<ExcursionsContextType | undefined>(undefined);

export function ExcursionsProvider({ children }: { children: ReactNode }) {
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let cancelled = false;

    async function init() {
      if (!isTursoConfigured) {
        setError('Turso is not configured. Set VITE_TURSO_URL and VITE_TURSO_AUTH_TOKEN in your .env file.');
        setIsLoading(false);
        return;
      }

      try {
        await ensureExcursionsTable();
        let rows = await fetchExcursions();
        if (rows.length === 0) {
          await seedDefaultExcursions();
          rows = await fetchExcursions();
        }
        if (!cancelled) {
          setExcursions(rows);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load excursions from Turso:', err);
        if (!cancelled) {
          setError('Failed to load excursions from the database.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const addExcursion = useCallback(async (input: ExcursionInput): Promise<Excursion> => {
    const newExcursion: Excursion = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await insertExcursion(newExcursion);
    setExcursions(prev => [newExcursion, ...prev]);
    return newExcursion;
  }, []);

  const updateExcursion = useCallback(async (id: string, input: ExcursionInput): Promise<void> => {
    await updateExcursionInDb(id, input);
    setExcursions(prev =>
      prev.map(exc =>
        exc.id === id ? { ...exc, ...input } : exc
      )
    );
  }, []);

  const deleteExcursion = useCallback(async (id: string): Promise<void> => {
    await deleteExcursionFromDb(id);
    setExcursions(prev => prev.filter(exc => exc.id !== id));
  }, []);

  const getExcursion = useCallback((id: string): Excursion | undefined => {
    return excursions.find(exc => exc.id === id);
  }, [excursions]);

  return (
    <ExcursionsContext.Provider value={{ excursions, isLoading, error, addExcursion, updateExcursion, deleteExcursion, getExcursion }}>
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