'use client';

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type Results = Record<string, unknown>[];

const ResultsContext = createContext<{
  results: Results;
  file: string;
  setResults: Dispatch<SetStateAction<Results>>;
  setFile: Dispatch<SetStateAction<string>>;
}>({ results: [], file: '', setResults: () => {}, setFile: () => {} });

export const useResults = () => useContext(ResultsContext);

export function ResultsProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<Results>([]);
  const [file, setFile] = useState('');

  return (
    <ResultsContext.Provider value={{ results, file, setResults, setFile }}>
      {children}
    </ResultsContext.Provider>
  );
}
