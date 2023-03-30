'use client';

import { useResults } from './ResultsContext';

export default function Results() {
  const { results, file } = useResults();

  if (!file) return null;

  return (
    <section className='bg-white my-8 rounded-2xl shadow overflow-clip'>
      <div className='p-6'>
        <h1 className='mb-4'>Results</h1>
        <div className='max-h-[20rem] overflow-auto'>
          <table className='table-auto border border-teal-300 border-collapse text-sm text-center'>
            <thead>
              <tr>
                {Object.keys(results[0]).map((k, i) => (
                  <th className='border border-teal-300 p-4' key={i}>
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  {Object.values(r).map((v, i) => (
                    <td className='border border-teal-300 p-4' key={i}>
                      {String(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='p-6'>
        <a href={`/api/results?q=${file}`} download className='btn'>
          Download
        </a>
      </div>
    </section>
  );
}
