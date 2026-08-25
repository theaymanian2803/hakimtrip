import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { ExcursionType, ExcursionTypeInput } from '@/types/excursionType';
import {
  ensureExcursionTypesTable,
  fetchExcursionTypes,
  insertExcursionType,
  updateExcursionTypeInDb,
  deleteExcursionTypeFromDb,
  seedDefaultExcursionTypes,
  isTursoConfigured,
} from '@/lib/turso';

interface ExcursionTypesContextType {
  excursionTypes: ExcursionType[];
  isLoading: boolean;
  error: string | null;
  addExcursionType: (input: ExcursionTypeInput) => Promise<ExcursionType>;
  updateExcursionType: (id: string, input: ExcursionTypeInput) => Promise<void>;
  deleteExcursionType: (id: string) => Promise<void>;
}

const ExcursionTypesContext = createContext<ExcursionTypesContextType | undefined>(undefined);

export function ExcursionTypesProvider({ children }: { children: ReactNode }) {
  const [excursionTypes, setExcursionTypes] = useState<ExcursionType[]>([]);
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
        await ensureExcursionTypesTable();
        let rows = await fetchExcursionTypes();
        if (rows.length === 0) {
          await seedDefaultExcursionTypes();
          rows = await fetchExcursionTypes();
        }
        if (!cancelled) {
          setExcursionTypes(rows);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load excursion types from Turso:', err);
        if (!cancelled) {
          setError('Failed to load excursion types from the database.');
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

  const addExcursionType = useCallback(async (input: ExcursionTypeInput): Promise<ExcursionType> => {
    const newType: ExcursionType = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await insertExcursionType(newType);
    setExcursionTypes(prev => [...prev, newType].sort((a, b) => a.name.localeCompare(b.name)));
    return newType;
  }, []);

  const updateExcursionType = useCallback(async (id: string, input: ExcursionTypeInput): Promise<void> => {
    await updateExcursionTypeInDb(id, input);
    setExcursionTypes(prev =>
      prev.map(t => (t.id === id ? { ...t, ...input } : t)).sort((a, b) => a.name.localeCompare(b.name))
    );
  }, []);

  const deleteExcursionType = useCallback(async (id: string): Promise<void> => {
    await deleteExcursionTypeFromDb(id);
    setExcursionTypes(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ExcursionTypesContext.Provider value={{ excursionTypes, isLoading, error, addExcursionType, updateExcursionType, deleteExcursionType }}>
      {children}
    </ExcursionTypesContext.Provider>
  );
}

export function useExcursionTypes() {
  const context = useContext(ExcursionTypesContext);
  if (context === undefined) {
    throw new Error('useExcursionTypes must be used within an ExcursionTypesProvider');
  }
  return context;
}