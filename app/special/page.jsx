'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { brand, products } from '../../lib/brand';
const occasions=['Birthday','Romance','Congratulations','Sympathy','Thank you','Just because'];
export default function SpecialPage(){
  const [occ,setOcc]=useState('Romance');
  const list=useMemo(()=>products.filter(p=>(p.occasion||[]).includes(occ)),[occ]);
  return (
    <div className="pr-special">
      <header className="pr-special-hero">
        <p className="pr-shop-kicker">{brand.nav[1]}</p>
        <h1 className="font-display">Occasion finder</h1>
        <p className="text-white/65 mt-2">Tell us the moment — we&apos;ll route the stems.</p>
      </header>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">{occasions.map(o=><button key={o} onClick={()=>setOcc(o)} className="chip" style={{outline:occ===o?'2px solid var(--accent)':undefined}}>{o}</button>)}</div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{(list.length?list:products).map(p=>(
        <Link key={p.id} href={`/product/${p.id}`} className="card-soft overflow-hidden group">
          <img src={p.img} alt="" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="p-4"><p className="font-semibold">{p.name}</p><p className="text-sm text-muted">{p.blurb}</p><p className="mt-2">${p.price}</p></div>
        </Link>))}</div>
    </div>
  );
}
