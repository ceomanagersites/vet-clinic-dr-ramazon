import { clinic } from "@/content/clinic";
import type { Dictionary } from "@/i18n";

export const speciesKeys = ["cat", "dog", "other"] as const;
export type Species = (typeof speciesKeys)[number];

export type BookingRequest = {
  owner: string;
  pet: string;
  species: string;
  reason: string;
  phone: string;
};

export const fieldLimits = { owner: 80, pet: 60, reason: 500, phone: 24 } as const;

type BookingTexts = Dictionary["booking"];
export type BookingErrorField = keyof BookingTexts["errors"];

export function isSpecies(value: string): value is Species {
  return speciesKeys.some((key) => key === value);
}

export function validateBooking(data: BookingRequest): BookingErrorField[] {
  const errors: BookingErrorField[] = [];
  if (data.owner.trim().length < 2) errors.push("owner");
  if (!isSpecies(data.species)) errors.push("species");
  const digits = data.phone.replace(/\D/g, "").length;
  if (digits < 9 || digits > 15) errors.push("phone");
  return errors;
}

export function formatBookingMessage(data: BookingRequest, texts: BookingTexts) {
  const pet = data.pet.trim();
  const species = isSpecies(data.species) ? texts.species[data.species].toLowerCase() : data.species;
  const lines = [
    texts.message.title,
    `${texts.message.owner}: ${data.owner.trim()}`,
    `${texts.message.pet}: ${pet ? `${pet}, ` : ""}${species}`,
    data.reason.trim() && `${texts.message.reason}: ${data.reason.trim()}`,
    `${texts.message.phone}: ${data.phone.trim()}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function telegramBookingLink(data: BookingRequest, texts: BookingTexts) {
  return `${clinic.telegramChat}?text=${encodeURIComponent(formatBookingMessage(data, texts))}`;
}
