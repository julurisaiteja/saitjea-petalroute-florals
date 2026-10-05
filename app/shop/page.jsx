'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.occasion || []).join(' ') + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return (cat === 'All' || p.cat === cat) && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, sort]);

  return (
    <div className="pr-shop">
      <header className="pr-shop-hero">
        <p className="pr-shop-kicker">Aurora mosaic · stem catalog</p>
        <h1 className="font-display">{brand.nav[0]}</h1>
        <p className="text-white/65 mt-2">Drift through color fields — filter by mood, occasion, and bloom weight.</p>
        <div className="pr-shop-controls">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search blooms, occasions…" className="pr-input" aria-label="Search bouquets" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="pr-input" aria-label="Category">
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="pr-input" aria-label="Sort">
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <div className="pr-cat-rail">
          {cats.map((c) => (
            <button key={c} type="button" className={`pr-cat-pill ${cat === c ? 'is-on' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </header>

      <div className="pr-mosaic-shop">
        {list.map((p, i) => (
          <article key={p.id} className={`pr-tile tile-${(i % 5) + 1}`}>
            <Link href={`/product/${p.id}`} className="pr-tile-media">
              <img src={p.img} alt={p.name} />
            </Link>
            <div className="pr-tile-body">
              <div className="flex justify-between gap-2">
                <Link href={`/product/${p.id}`} className="font-display text-xl">{p.name}</Link>
                <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist">{wish.includes(p.id) ? '♥' : '♡'}</button>
              </div>
              <p className="text-sm text-white/60 mt-1">{p.blurb}</p>
              <div className="mt-3 flex items-center justify-between">
                <span>${p.price}</span>
                <span className="text-xs text-white/50">★ {p.rating} · {p.cat}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!list.length && <p className="pr-empty">No blooms match — try another filter.</p>}
    </div>
  );
}
