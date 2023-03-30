import { Roboto_Mono } from 'next/font/google';
import { ToastProvider } from './ToastContext';
import Header from './Header';
import Toast from './Toast';
import './globals.css';

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: { default: 'Examiner', template: '%s | Examiner' },
  description: 'A paper marking utility.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={robotoMono.variable}>
      <body className='font-mono bg-zinc-100 text-zinc-900 scroll-smooth'>
        <ToastProvider>
          <Header />
          {children}
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
