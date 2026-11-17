"use client";

import { useRef, useState, type CSSProperties, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/content/gallery";

const spanClasses = {
  big: "col-span-2 row-span-2",
  tall: "row-span-2",
};

type GalleryLabels = {
  openPhoto: string;
  dialog: string;
  closeViewer: string;
  previous: string;
  next: string;
  of: string;
};

export function GalleryGrid({ items, labels }: { items: GalleryItem[]; labels: GalleryLabels }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  const open = (index: number) => {
    setActiveIndex(index);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = (delta: number) => {
    setActiveIndex((index) => (index + delta + items.length) % items.length);
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) > 48) step(distance < 0 ? 1 : -1);
  };

  return (
    <>
      <ul className="gallery-grid">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={item.span ? spanClasses[item.span] : undefined}
            data-reveal="image"
            style={{ "--reveal-delay": `${(index % 4) * 50}ms` } as CSSProperties}
          >
            <button type="button" onClick={() => open(index)} className="gallery-tile block cursor-zoom-in" aria-label={`${labels.openPhoto} ${item.alt}`}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes={item.span === "big" ? "(min-width: 768px) 46vw, 92vw" : "(min-width: 768px) 23vw, 46vw"}
                className="object-cover"
                style={{ objectPosition: item.position }}
              />
              <span className="tile-caption">{item.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={labels.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex h-full flex-col pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm text-milk/70 tabular-nums" aria-live="polite">
              {activeIndex + 1} {labels.of} {items.length}
            </p>
            <button type="button" onClick={close} aria-label={labels.closeViewer} className="grid size-12 place-items-center rounded-full bg-milk/10 transition duration-160 hover:bg-milk/20 active:scale-95">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 px-4 sm:px-20"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="relative mx-auto h-full w-full max-w-5xl">
              <Image key={active.id} src={active.image} alt={active.alt} fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-contain" />
            </div>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={labels.previous}
              className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-milk/10 transition hover:bg-milk/20 sm:grid"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={labels.next}
              className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-milk/10 transition hover:bg-milk/20 sm:grid"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>

          <p className="px-5 py-4 text-center text-milk/85">{active.alt}</p>
        </div>
      </dialog>
    </>
  );
}
