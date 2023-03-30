import Evaluate from './Evaluate';
import Results from './Results';
import { ResultsProvider } from './ResultsContext';

export default function Home() {
  return (
    <main className='container'>
      <ResultsProvider>
        <Evaluate />
        <Results />
      </ResultsProvider>
    </main>
  );
}
