'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

const links = [
  { href: '/shop', label: brand.nav[0] },
  { href: '/special', label: brand.nav[1] },
  { href: '/#posy', label: brand.nav[2] },
  { href: '/#care', label: brand.nav[3] },
];

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div data-diamond="batch-1" className="pr-shell">
      <a href="#main" className="skip-link">Skip to blooms</a>
      <div className="offer-banner pr-banner">{brand.offer.label} · <span style={{ color: 'var(--accent)' }}>{brand.offer.code}</span></div>
      <header className="pr-header">
        <div className="pr-header-inner">
          <Link href="/" className="pr-logo font-display">{brand.name}</Link>
          <nav className="pr-nav" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="pr-nav-link">{l.label}</Link>
            ))}
            <Link href="/cart" className="btn-brand pr-cart">Cart{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
          <div className="pr-mobile">
            <Link href="/cart" className="btn-brand !py-2 !px-3 text-sm">Cart {count || ''}</Link>
            <button type="button" className="pr-burger" aria-expanded={open} aria-controls="pr-drawer" onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
        <div id="pr-drawer" className="pr-drawer" hidden={!open}>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>Cart{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="pr-footer">
        <div className="pr-footer-grid">
          <div>
            <p className="font-display pr-footer-brand">{brand.name}</p>
            <p className="text-muted mt-2 max-w-md">{brand.description}</p>
          </div>
          <div>
            <p className="pr-footer-h">Route</p>
            <ul>{links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <p className="pr-footer-h">Studio</p>
            <ul>
              <li>Secure checkout UI (demo)</li>
              <li>Wishlist & Posy Club</li>
              <li>{brand.aiName}</li>
            </ul>
          </div>
          <div>
            <p className="pr-footer-h">Stem notes</p>
            <form className="pr-mail" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email for bloom drops" aria-label="Email for bloom drops" />
              <button type="submit" className="btn-brand !py-2">Join</button>
            </form>
          </div>
        </div>
        <p className="pr-legal">Demo storefront · no real payments · {brand.name}</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/shop" className="btn-brand !py-2 !px-4 text-sm">{brand.nav[0]}</Link>
        <Link href="/special" className="btn-ghost !py-2 !px-4 text-sm">{brand.nav[1]}</Link>
      </div>
      <AIAssistant />
    </div>
  );
}
