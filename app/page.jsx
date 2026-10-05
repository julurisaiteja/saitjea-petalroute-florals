'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

function Stars({ n }) {
  return <span className="stars">{'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}</span>;
}

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live = typeof brand.stats[0].value === 'number' ? brand.stats[0].value + (tick % 7) : brand.stats[0].value;

  return (
    <>
      <section className="aurora-hero">
        <div className="aurora-blobs" aria-hidden="true" />
        <video autoPlay muted loop playsInline poster={brand.poster}>
          <source src={brand.video} type="video/mp4" />
        </video>
        <div className="aurora-copy">
          <p className="aurora-brand reveal-fade">{brand.name}</p>
          <h1 className="mt-4 text-xl md:text-2xl font-light text-white/90 reveal-fade delay-1">{brand.tagline}</h1>
          <p className="mt-4 text-white/65 reveal-fade delay-2">{brand.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center reveal-fade delay-3">
            <Link href="/shop" className="btn-brand">Send blooms</Link>
            <Link href="/special" className="btn-ghost">Occasions</Link>
          </div>
        </div>
      </section>

      <section className="pr-pulse">
        {brand.stats.map((s, i) => (
          <div key={s.label} className="pr-pulse-card">
            <p className="font-display pr-pulse-val">{i === 0 ? live : s.value}</p>
            <p className="text-white/70 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="aurora-mosaic">
        {products.slice(0, 8).map((p) => (
          <Link key={p.id} href={`/product/${p.id}`}>
            <img src={p.img} alt={p.name} />
            <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: 'linear-gradient(transparent, rgba(20,10,30,.75))' }}>
              <p className="font-display text-lg text-white">{p.name}</p>
              <p className="text-xs text-white/70">${p.price}</p>
            </div>
          </Link>
        ))}
      </section>

      <section id="posy" className="pr-posy">
        <div className="pr-posy-copy">
          <h2 className="font-display">{brand.nav[2]}</h2>
          <p className="text-white/70 mt-3">A monthly stem ritual — seasonal colorways, vase optional, pause anytime. First delivery can carry {brand.offer.code}.</p>
          <Link href="/special" className="btn-brand mt-6">Join the club</Link>
        </div>
        <div className="pr-posy-orb" aria-hidden="true" />
      </section>

      <section id="care" className="pr-care">
        <h2 className="font-display">{brand.nav[3]}</h2>
        <p className="text-white/65 mt-2">Keep blooms luminous for days — soft guidance, not guarantees.</p>
        <div className="pr-care-grid">
          <div className="card-soft p-5"><p className="font-display text-2xl">Cut & hydrate</p><p className="text-sm text-white/65 mt-2">Recut stems on an angle; fresh water daily.</p></div>
          <div className="card-soft p-5"><p className="font-display text-2xl">Cool light</p><p className="text-sm text-white/65 mt-2">Keep away from heat vents and harsh sun.</p></div>
          <div className="card-soft p-5"><p className="font-display text-2xl">Stem diet</p><p className="text-sm text-white/65 mt-2">Strip leaves below the waterline.</p></div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-4xl px-4 py-16 grid gap-6 md:grid-cols-2">
        {brand.reviews.map((r) => (
          <blockquote key={r.name} className="card-soft p-5 text-white">
            <Stars n={r.stars} />
            <p className="mt-3 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <footer className="mt-3 text-sm text-white/60">{r.name}</footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
