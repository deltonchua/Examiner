'use client';

import { FileTypes } from '@/lib/excel';
import { type FormEvent, useState } from 'react';
import { useToast } from '../ToastContext';
import { FormProvider, useForm } from './FormContext';
import Input from './Input';
import { useResults } from './ResultsContext';

export default function Evaluate() {
  return (
    <section className='bg-white my-8 rounded-2xl shadow overflow-clip'>
      <FormProvider>
        <Form />
        <div className='p-6 pt-0 text-xs font-semibold text-zinc-600 space-y-2'>
          <div className='flex items-center justify-between gap-4'>
            <span>File type</span>
            <span>.csv .xls .xlsx</span>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span>Format</span>
            <span>
              <a
                href='https://docs.google.com/spreadsheets/d/1BapLYAx0To2qYKCirCtflMDl_QKtsmIXrOsepCplodM/edit?usp=share_link'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Template
              </a>{' '}
              <a
                href='https://docs.google.com/spreadsheets/d/1FxIp1cOWmW_JzwOJdy9aZeyMHlqAeThhIA0ybmHqQqc/edit?usp=share_link'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Answers
              </a>
            </span>
          </div>
        </div>
      </FormProvider>
    </section>
  );
}

function Form() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setFile, setResults } = useResults();
  const { form } = useForm();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;
    const { template, answers } = form;
    if (
      template &&
      answers &&
      FileTypes.includes(template.type) &&
      FileTypes.includes(answers.type)
    ) {
      const fd = new FormData();
      fd.append('template', template);
      fd.append('answers', answers);
      try {
        setLoading(true);
        setResults([]);
        setFile('');
        const res = await fetch('/api/evaluate', {
          method: 'POST',
          body: fd,
        });
        const { data, error } = await res.json();
        if (error) throw new Error(error);
        const { results, filename } = data;
        setResults(results);
        setFile(filename);
        toast('Evaluation complete.');
      } catch (err) {
        console.error(err);
        toast((err as Error)?.message || 'ERROR', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input title='Template' type='template' />
      <Input title='Asnwers' type='answers' />
      <div className='p-6'>
        <button type='submit' disabled={loading} className='btn'>
          {loading ? 'Evaluating...' : 'Evaluate'}
        </button>
      </div>
    </form>
  );
}
