export interface ExcursionType {
  id: string;
  name: string;
  createdAt: string;
}

export type ExcursionTypeInput = Omit<ExcursionType, 'id' | 'createdAt'>;