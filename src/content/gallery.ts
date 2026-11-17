import type { StaticImageData } from "next/image";
import type { Dictionary } from "@/i18n";
import team from "@/assets/images/team-golden-cat.jpg";
import foldPortrait from "@/assets/images/g-fold-portrait.jpg";
import gingerTable from "@/assets/images/g-ginger-table.jpg";
import calico from "@/assets/images/g-calico.jpg";
import foldMint from "@/assets/images/g-fold-mint.jpg";
import gingerCarrier from "@/assets/images/g-ginger-carrier.jpg";
import kittensWard from "@/assets/images/g-kittens-ward.jpg";
import puppy from "@/assets/images/g-puppy.jpg";
import xrayPins from "@/assets/images/g-xray-pins.jpg";

export type GalleryPhoto = {
  id: keyof Dictionary["gallery"]["items"];
  image: StaticImageData;
  span?: "big" | "tall";
  position?: string;
};

export type GalleryItem = GalleryPhoto & { alt: string };

// Порядок подобран так, чтобы сетка заполнялась без пустых ячеек на 2 и 4 колонках.
export const galleryPhotos: GalleryPhoto[] = [
  { id: "team", image: team, span: "big", position: "50% 22%" },
  { id: "foldMint", image: foldMint, span: "tall" },
  { id: "gingerTable", image: gingerTable, span: "tall" },
  { id: "kittensWard", image: kittensWard, span: "tall" },
  { id: "foldPortrait", image: foldPortrait },
  { id: "gingerCarrier", image: gingerCarrier, span: "tall" },
  { id: "calico", image: calico },
  { id: "puppy", image: puppy },
  { id: "xrayPins", image: xrayPins },
];
