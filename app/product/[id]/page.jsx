'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { brand, getProduct, products } from '../../../lib/brand';
import { useCart } from '../../../lib/cart';

function useNicheState(product){
  const niche = "florals";
  const v = brand.variants || {};
  const [size,setSize]=useState(v.sizes[1]);
  const [vase,setVase]=useState(v.vases[0]);
  const [date,setDate]=useState('Tomorrow');
  const sizeDelta=size==='Posy'?-10:size==='Grand'?24:0;
  const price=(product?.price||0)+sizeDelta+(vase?.price||0);
  const meta=`${size} · ${vase.label} · deliver ${date}`;
  const lineKey=product?`${product.id}-${size}-${vase.id}-${date}`:'';
  const ui = (<>
      <p className="text-sm">Occasions: {(product?.occasion||[]).join(' · ')}</p>
      <div><p className="text-sm font-semibold mb-2">Size</p><div className="flex flex-wrap gap-2">{v.sizes.map(s=><button key={s} onClick={()=>setSize(s)} className="chip" style={{outline:size===s?'2px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
      <div><p className="text-sm font-semibold mb-2">Vase</p><div className="flex flex-wrap gap-2">{v.vases.map(s=><button key={s.id} onClick={()=>setVase(s)} className="chip" style={{outline:vase.id===s.id?'2px solid var(--brand)':undefined}}>{s.label}{s.price?` +$${s.price}`:''}</button>)}</div></div>
      <div><p className="text-sm font-semibold mb-2">Delivery day</p><div className="flex flex-wrap gap-2">{['Today','Tomorrow','Saturday','Sunday'].map(s=><button key={s} onClick={()=>setDate(s)} className="chip" style={{outline:date===s?'2px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
      <details className="card-soft px-4 py-3 text-sm"><summary className="cursor-pointer font-medium">Care guide</summary><p className="mt-2 text-muted">Trim stems, fresh water daily, keep cool.</p></details>
    </>);
  const details = (<ul className="text-sm text-muted space-y-1 list-disc pl-5"><li>Same-day metro by 1pm</li><li>Card notes at checkout</li><li>Posy Club available</li></ul>);
  return { price, meta, lineKey, ui, details };
}

export default function ProductPage(){
  const { id } = useParams();
  const product = getProduct(id);
  const { add, toggleWish, wish } = useCart();
  const router = useRouter();
  const custom = useNicheState(product);
  if(!product) return <div className="mx-auto max-w-6xl px-4 py-20">Product not found. <Link href="/shop" className="underline">Back to shop</Link></div>;
  const more = products.filter(p=>p.id!==id && p.cat===product.cat).slice(0,3);
  const related = more.length ? more : products.filter(p=>p.id!==id).slice(0,3);
  const faq = [
    { q:'Shipping / delivery?', a:'Demo checkout shows ETA after address entry.' },
    { q:'Returns?', a:'Most items support 30-day exchanges in this demo narrative.' },
    { q:'Need help?', a:`Ask ${brand.aiName} (bottom-right) for niche guidance.` },
  ];
  function onAdd(){ add({ id:product.id, name:product.name, price:custom.price, img:product.img, qty:1, lineKey:custom.lineKey, meta:custom.meta }); router.push('/cart'); }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="card-soft overflow-hidden aspect-square"><img src={product.img} alt={product.name} className="h-full w-full object-cover" /></div>
          <div className="mt-3 grid grid-cols-3 gap-2">{[product.img, brand.poster, products[0].img].map((src,i)=>(
            <div key={i} className="aspect-video overflow-hidden rounded-xl opacity-90"><img src={src} alt="" className="h-full w-full object-cover" /></div>
          ))}</div>
        </div>
        <div>
          <p className="text-sm text-muted">{product.cat}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-1">{product.name}</h1>
          <p className="mt-2 text-muted">{product.blurb}</p>
          <p className="mt-3 text-sm">★ {product.rating} · {product.reviews} reviews</p>
          <p className="mt-4 font-display text-3xl" style={{color:'var(--brand)'}}>${custom.price.toFixed(2)}</p>
          <div className="mt-3 flex flex-wrap gap-2">{(product.tags||[]).map(t=><span key={t} className="chip">{t}</span>)}</div>
          <div className="mt-6 space-y-5">{custom.ui}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-brand" onClick={onAdd}>Add to cart</button>
            <button className="btn-ghost" onClick={()=>toggleWish(product.id)}>{wish.includes(product.id)?'♥ Saved':'♡ Wishlist'}</button>
            <Link href="/special" className="btn-ghost">{brand.nav[1]}</Link>
          </div>
          <div className="mt-10 space-y-3"><h2 className="font-semibold text-lg">Details</h2>{custom.details}</div>
          <div className="mt-8 space-y-2"><h2 className="font-semibold text-lg">FAQ</h2>
            {faq.map(f=><details key={f.q} className="card-soft px-4 py-3"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 text-sm text-muted">{f.a}</p></details>)}
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-3xl">You may also like</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map(p=>(
          <Link key={p.id} href={`/product/${p.id}`} className="card-soft overflow-hidden">
            <img src={p.img} alt={p.name} className="aspect-video w-full object-cover" />
            <div className="p-3 flex justify-between"><span className="font-medium">{p.name}</span><span>${p.price}</span></div>
          </Link>))}</div>
      </section>
    </div>
  );
}
