'use client';

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export interface Form {
  template?: File;
  answers?: File;
}

const FormContext = createContext<{
  form?: Form;
  setForm: Dispatch<SetStateAction<Form | undefined>>;
}>({ setForm: () => {} });

export const useForm = () => useContext(FormContext);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<Form>();

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
}
