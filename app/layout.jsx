import './globals.css';
import { CartProvider } from '../lib/cart';
import Shell from '../components/Shell';
export const metadata = { title: 'Petalroute — Stems with a destination', description: "Flower delivery with occasion finder, vase upgrades, and care guides." };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body><CartProvider><Shell>{children}</Shell></CartProvider></body>
    </html>
  );
}
