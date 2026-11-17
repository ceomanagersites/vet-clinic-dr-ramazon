import { PawMark } from "@/components/ui/Icons";

export function Logo({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a href="#top" className={`inline-flex min-w-0 items-center gap-1.5 min-[22.5rem]:gap-2.5 ${className}`} aria-label={label}>
      <PawMark className="size-6 min-[22.5rem]:size-8" />
      <span className="min-w-0 leading-none">
        <span className="block truncate text-[1.1rem] font-normal tracking-[-0.03em] min-[22.5rem]:text-[1.32rem]">Dr.Ramazon</span>
        <span className="mt-1 block truncate text-[0.62rem] tracking-[0.01em] opacity-70 min-[22.5rem]:text-[0.68rem]">Veterinary Clinic</span>
      </span>
    </a>
  );
}
