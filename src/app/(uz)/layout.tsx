import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata, viewport as sharedViewport } from "@/lib/metadata";

export const metadata = buildMetadata("uz");
export const viewport = sharedViewport;

export default function UzbekLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="uz">{children}</RootDocument>;
}
