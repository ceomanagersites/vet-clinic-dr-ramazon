import { CalendarHeart, Phone } from "lucide-react";
import { primaryPhone } from "@/content/clinic";

export function MobileCallBar({ call, book }: { call: string; book: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sage-300/60 bg-milk/95 px-3 pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={`tel:${primaryPhone.tel}`} className="btn btn-outline min-h-12! border-pine/30! px-3! text-pine">
          <Phone size={18} strokeWidth={1.6} />
          {call}
        </a>
        <a href="#booking" className="btn btn-primary min-h-12! px-3!">
          <CalendarHeart size={18} strokeWidth={1.6} />
          {book}
        </a>
      </div>
    </div>
  );
}
