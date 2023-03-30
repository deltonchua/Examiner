'use client';

import { FileTypes } from '@/lib/excel';
import { type ChangeEvent } from 'react';
import { Form, useForm } from './FormContext';

export default function Input({
  title,
  type,
}: {
  title: string;
  type: keyof Form;
}) {
  const { form, setForm } = useForm();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && FileTypes.includes(file.type)) {
      setForm({ ...form, [type]: file });
      return;
    }
    setForm({ ...form, [type]: undefined });
  };

  return (
    <div className='p-6 first:border-b first:border-zinc-100'>
      <label htmlFor={type}>{title}</label>
      <input
        type='file'
        name={type}
        id={type}
        accept={FileTypes.join(',')}
        className='block w-full mt-4 text-sm
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0 file:cursor-pointer
file:text-sm file:font-semibold
file:bg-teal-50 file:text-teal-700
hover:file:bg-teal-100
'
        required
        onChange={onChange}
      />
    </div>
  );
}
