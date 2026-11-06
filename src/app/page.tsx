"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
 ["12184258_725176964253871_5137160113236050502_o-2-584x438", "Living room & kitchen"],
 ["12186850_725177030920531_5417882192989737953_o-1-584x438", "Kitchen"],
 ["11241934_725177260920508_2936501969514507150_o-1-584x438", "Light-filled living area"],
 ["12189315_725176857587215_4160668966808071724_o-584x438", "Stairway"],
 ["12186751_725177384253829_2852336406927728551_o-584x438", "Bedroom"],
 ["10524211_725177024253865_2417363289769951115_o-584x438", "Bedroom doorway"],
 ["12184028_725177340920500_6069871700875084262_o-584x438", "Bathroom entrance"],
 ["12186526_725177327587168_3837285251236427096_o-584x438", "Bathroom vanity"],
 ["12184021_725177304253837_613581180553441281_o-584x438", "Closet storage"],
 ["11057357_725177237587177_7131919993864187258_o-584x438", "Bedroom closet"],
 ["905942_725177407587160_6193803015848095200_o-584x438", "Bedroom window"],
 ["12194866_725176750920559_1579930966571091005_o-584x438", "Kitchen breakfast bar"],
];

type ArrowDirection = "up-right" | "down" | "up" | "left" | "right";

function Arrow({ direction = "up-right" }: { direction?: ArrowDirection }) {
 const rotation = { "up-right": -45, down: 90, up: -90, left: 180, right: 0 }[direction];
 return <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" transform={`rotate(${rotation} 12 12)`} /></svg>;
}

export default function Home() {
 const [menu, setMenu] = useState(false);
 const [showVideo, setShowVideo] = useState(false);
 const [videoPlaying, setVideoPlaying] = useState(false);
 const [videoReady, setVideoReady] = useState(false);
 const heroVideo = useRef<HTMLVideoElement>(null);
 useEffect(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  let startTimer: ReturnType<typeof setTimeout> | undefined;
  const updatePreference = () => {
   clearTimeout(startTimer);
   setVideoReady(false);
   if (preference.matches || connection?.saveData) {
    setShowVideo(false);
    return;
   }
   // A bounded delay gives the still image a head start without waiting on
   // unrelated page requests (which can remain pending in development).
   startTimer = setTimeout(() => setShowVideo(true), 350);
  };
  updatePreference();
  preference.addEventListener("change", updatePreference);
  return () => {
   clearTimeout(startTimer);
   preference.removeEventListener("change", updatePreference);
  };
 }, []);
 useEffect(() => {
  const video = heroVideo.current;
  if (!showVideo || !video) return;
  video.muted = true;
  void video.play().catch(() => setVideoPlaying(false));
 }, [showVideo]);
 const [selected, setSelected] = useState<number | null>(null);
 const dialog = useRef<HTMLDialogElement>(null);
 const openPhoto = (index: number) => {
  setSelected(index);
  dialog.current?.showModal();
 };
 const closePhoto = () => {
  dialog.current?.close();
  setSelected(null);
 };
 useEffect(() => {
  if (selected === null) return;
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => { document.body.style.overflow = previousOverflow; };
 }, [selected]);
 return <>
  <a className="skip" href="#main">Skip to content</a>
  <header className="header">
   <a href="#" className="brand" aria-label="Conestoga Apartments home"><span className="brand-mark" aria-hidden="true">⌂</span><span>CONESTOGA<small>APARTMENTS · RUPERT, IDAHO</small></span></a>
   <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? "Close ✕" : "Menu ☰"}</button>
   <nav id="navigation" className={menu ? "navigation open" : "navigation"} aria-label="Main navigation">
    {[["The apartments", "apartments"], ["Neighborhood", "neighborhood"], ["Gallery", "gallery"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
    <a className="button small" href="#contact" onClick={() => setMenu(false)}>Call for an application <Arrow /></a>
   </nav>
  </header>
  <main id="main">
   <section className="hero">
    <Image src="/images/ai-enhanced-v1/house2.webp" alt="Conestoga Apartments exterior with covered parking and a green lawn" fill priority sizes="100vw" className="hero-image" />
    {showVideo && <video ref={heroVideo} className={`hero-video${videoReady ? " is-ready" : ""}`} autoPlay muted loop playsInline preload="auto" aria-hidden="true" onPlaying={() => { setVideoReady(true); setVideoPlaying(true); }} onPause={() => setVideoPlaying(false)} onError={() => { setVideoReady(false); setVideoPlaying(false); }}>
     <source src="/videos/apartment-tour-mobile.mp4" type="video/mp4" media="(max-width: 700px)" />
     <source src="/videos/apartment-tour.mp4" type="video/mp4" />
    </video>}
    <div className="hero-shade" />
    <div className="hero-content"><p className="eyebrow light">A PLACE TO LAND. A PLACE TO BELONG.</p><h1>A little more space.<br/>A lot more home.</h1><p>Comfortable two- and three-bedroom apartments.<br/>Small-town living in Rupert, Idaho.</p><a href="#apartments" className="button cream">Explore your next home <Arrow direction="down" /></a></div>
    <div className="hero-caption"><span>CONESTOGA APARTMENTS</span><span>Rooted in Rupert.</span></div>
    {showVideo && <button type="button" className="hero-video-toggle" onClick={() => {
     const video = heroVideo.current;
     if (!video) return;
     if (video.paused) void video.play().catch(() => setVideoPlaying(false));
     else video.pause();
    }}>{videoPlaying ? "Pause video" : "Play video"}</button>}
   </section>
   <section id="apartments" className="section apartments">
    <div className="section-intro"><div><p className="eyebrow">ROOM FOR EVERYDAY LIFE</p><h2>Settle in.<br/>Spread out.</h2></div><div className="intro-copy"><p>Two floors. Thoughtful features. A place to make your own. Our apartments share the same everyday comforts, with a choice of layouts to fit the way you live.</p><p className="price">From <strong>$1,200</strong> / month</p><small>Two bedrooms: $1,200/month · Three bedrooms: $1,350/month.</small></div></div>
    <div className="stats">{[["2–3", "Bedrooms"], ["02", "Bathrooms"], ["$1,000", "Deposit"], ["02", "Floors"]].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
    <div className="home-details"><div className="detail-photo"><Image src="/images/ai-enhanced-v1/12186850_725177030920531_5417882192989737953_o-1-584x438.webp" alt="Kitchen with wood cabinets, appliances and counter space" fill sizes="(max-width: 700px) 100vw, 50vw" /><span>Everyday comfort, built in.</span></div><div className="details-copy"><p className="eyebrow">THE LITTLE THINGS, TAKEN CARE OF</p><h3>Make yourself at home.</h3><div className="amenities">{["Washer", "Dryer", "Refrigerator", "Stove", "Parking", "Fenced deck"].map(a => <span key={a}><i>✓</i>{a}</span>)}</div><p className="muted">Built in 2015. Utilities are not included; the original estimate is approximately $170/month for gas, water, sewer, garbage and electricity. Please call to confirm current costs.</p></div></div>
    <div className="layouts"><div><span className="layout-label">LAYOUT A · 2 BEDROOMS · 2 BATHROOMS</span><h3>A bedroom on each floor.</h3><p className="layout-price">$1,200 <span>/ month</span></p><p>980 square feet. One bedroom on each level. The downstairs bathroom features a taller toilet and walk-in shower.</p></div><div><span className="layout-label">LAYOUT B · 2 BEDROOMS · 2 BATHROOMS</span><h3>Bedrooms together downstairs.</h3><p className="layout-price">$1,200 <span>/ month</span></p><p>980 square feet. Both bedrooms are located downstairs. Both bathrooms feature tub-shower combinations.</p></div><div><span className="layout-label">LAYOUT C · 3 BEDROOMS · 2 BATHROOMS</span><h3>A little extra room.</h3><p className="layout-price">$1,350 <span>/ month</span></p><p>Two bedrooms upstairs and one bedroom downstairs, with two bathrooms.</p></div></div>
    <div className="rental-details"><div><p className="eyebrow">A PLACE FOR YOU AND YOUR PET</p><h3>Small pets. Warm welcomes.</h3><p>Pet friendly for pets weighing 15 lbs or less.</p></div><dl><div><dt>Apartment deposit</dt><dd>$1,000</dd></div><div><dt>Monthly pet rent</dt><dd>$50 / month</dd></div><div><dt>Non-refundable pet deposit</dt><dd>$500</dd></div></dl></div>
   </section>
   <section id="neighborhood" className="neighborhood"><div className="neighborhood-image"><Image src="/images/ai-enhanced-v1/house1.webp" alt="Front entrance of the apartments on a sunny day in Rupert" fill sizes="(max-width: 700px) 100vw, 60vw" /></div><div className="neighborhood-copy"><p className="eyebrow">SMALL TOWN. GOOD COMPANY.</p><h2>Right at home <br/>in Rupert.</h2><p>Find us at 1120 Wagon Wheel Drive, behind Minidoka Hospital in Rupert. Enjoy the Mini-Cassia area, with two community parks within walking distance. The Wilson Theatre is close to Conestoga Apartments, with dinner theaters, plays and other events.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=1120+Wagon+Wheel+Drive+Rupert+Idaho" target="_blank" rel="noreferrer">Get directions <Arrow /></a><p className="map-note">1120 Wagon Wheel Drive · Rupert, Idaho</p></div></section>
   <section id="gallery" className="section gallery"><div className="gallery-heading"><div><p className="eyebrow">TAKE A LOOK AROUND</p><h2>Picture life here.</h2></div><p>A closer look at the spaces<br/>you’ll call your own.</p></div><div className="photo-grid">{photos.map(([file, label], i) => <button key={file} type="button" onClick={() => openPhoto(i)} aria-haspopup="dialog" aria-label={`View photo: ${label}`}><Image src={`/images/ai-enhanced-v1/${file}.webp`} alt={label} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" /><span>{label} <Arrow /></span></button>)}</div><p className="gallery-note">Photos from the original property website. Features and finishes may vary by apartment.</p></section>
   <section id="contact" className="contact"><div><p className="eyebrow light">YOUR NEXT CHAPTER STARTS HERE</p><h2>Come see it<br/>for yourself.</h2><p>Walk-throughs are by appointment only.<br/>Call for an application, ask about availability, or arrange a tour.</p></div><div className="contact-people"><a href="tel:+12083000129"><span>Cecilia <small>OWNER</small></span><strong>208-300-0129 <Arrow /></strong></a><a href="tel:+12082196200"><span>Brooke <small>SE HABLA ESPAÑOL</small></span><strong>208-219-6200 <Arrow /></strong></a><p>Call for an application. We’d love to help you find your next home.</p></div></section>
  </main>
  <footer><a className="footer-brand" href="#">Conestoga Apartments</a><span>1120 Wagon Wheel Drive · Rupert, Idaho</span><small>© {new Date().getFullYear()} Conestoga Apartments</small><a href="#">Back to top <Arrow direction="up" /></a></footer>
  <a className="mobile-call" href="tel:+12083000129">Call for an application <Arrow /></a>
  <dialog className="gallery-dialog" ref={dialog} onCancel={closePhoto} onClose={() => setSelected(null)} onKeyDown={e => {
   if (selected === null) return;
   if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    setSelected((selected + (e.key === "ArrowRight" ? 1 : photos.length - 1)) % photos.length);
   }
  }} aria-label="Apartment photo gallery">
   {selected !== null && <div className="lightbox">
    <div className="lightbox-header"><span>PHOTO GALLERY · {selected + 1} / {photos.length}</span><button type="button" className="close-photo" onClick={closePhoto} autoFocus>Close <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
    <div className="lightbox-image"><Image src={`/images/ai-enhanced-v1/${photos[selected][0]}.webp`} alt={photos[selected][1]} fill sizes="100vw" /></div>
    <div className="photo-controls"><button type="button" onClick={() => setSelected((selected + photos.length - 1) % photos.length)} aria-label="Previous photo"><Arrow direction="left" /></button><p aria-live="polite">{photos[selected][1]}</p><button type="button" onClick={() => setSelected((selected + 1) % photos.length)} aria-label="Next photo"><Arrow direction="right" /></button></div>
   </div>}
  </dialog>
 </>;
}
