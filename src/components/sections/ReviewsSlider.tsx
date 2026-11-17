"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinic } from "@/content/clinic";
import type { Dictionary } from "@/i18n/ru";

type ReviewsTexts = Dictionary["reviews"];

export function ReviewsSlider({ t }: { t: ReviewsTexts }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { stories } = t;

  const slideWidth = () => {
    const track = trackRef.current;
    const slide = track?.firstElementChild as HTMLElement | null;
    if (!track || !slide) return 0;
    return slide.offsetWidth + Number.parseFloat(getComputedStyle(track).columnGap || "0");
  };

  const move = (direction: 1 | -1) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollBy({ left: direction * slideWidth(), behavior: reduceMotion ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    const width = slideWidth();
    if (!track || !width) return;
    const reachedEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    setIsAtEnd(reachedEnd);
    setCurrent(reachedEnd ? stories.length - 1 : Math.round(track.scrollLeft / width));
  };

  return (
    <>
      <div className="wrap mt-10 flex items-center justify-end gap-2 lg:mt-12">
        <p className="mr-auto text-moss tabular-nums" aria-live="polite">
          {current + 1} {t.of} {stories.length}
        </p>
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={current === 0}
          aria-label={t.previous}
          className="grid size-12 place-items-center rounded-full border border-pine/30 text-pine transition duration-160 enabled:hover:bg-pine enabled:hover:text-milk enabled:active:scale-95 disabled:opacity-35"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={isAtEnd}
          aria-label={t.next}
          className="grid size-12 place-items-center rounded-full border border-pine/30 text-pine transition duration-160 enabled:hover:bg-pine enabled:hover:text-milk enabled:active:scale-95 disabled:opacity-35"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      <ul ref={trackRef} onScroll={onScroll} className="slider mt-5" tabIndex={0} aria-label={t.listAria}>
        {stories.map((story) => (
          <li key={story.title} className="flex flex-col rounded-[1.5rem] bg-milk p-7 sm:p-8">
            <h3 className="text-[1.45rem] leading-tight font-light tracking-[-0.02em] text-pine">{story.title}</h3>
            <p className="mt-4 mb-6 text-ink/80">{story.text}</p>
            <a
              href={clinic.reviews.yandex}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-11 items-center self-start text-sm text-moss underline underline-offset-4 transition-colors hover:text-pine"
            >
              {t.source}, {story.date}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
