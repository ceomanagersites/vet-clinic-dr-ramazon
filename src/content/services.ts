import {
  AudioWaveform,
  Bandage,
  Bath,
  BedDouble,
  Bone,
  HeartPulse,
  HousePlus,
  MessageCircle,
  Scissors,
  Stethoscope,
  Syringe,
  TestTube,
  Toothbrush,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";

export type ServiceId = keyof Dictionary["services"]["items"];
export type ServiceGroupId = keyof Dictionary["services"]["groups"];

export type Service = {
  id: ServiceId;
  icon: LucideIcon;
  priceFrom?: number;
  contact?: "phone" | "telegram";
};

export type ServiceGroup = {
  id: ServiceGroupId;
  services: Service[];
};

// В списке только то, что подтверждено постами клиники или отзывами владельцев. Цены в сумах.
export const serviceGroups: ServiceGroup[] = [
  {
    id: "examination",
    services: [
      { id: "consultation", icon: Stethoscope, priceFrom: 150000 },
      { id: "ultrasound", icon: AudioWaveform, priceFrom: 150000 },
      { id: "xray", icon: Bone, priceFrom: 100000 },
      { id: "labs", icon: TestTube, priceFrom: 150000 },
    ],
  },
  {
    id: "treatment",
    services: [
      { id: "treatment", icon: HeartPulse },
      { id: "surgery", icon: Scissors },
      { id: "sterilization", icon: Bandage },
      { id: "dental", icon: Toothbrush },
      { id: "inpatient", icon: BedDouble },
    ],
  },
  {
    id: "prevention",
    services: [
      { id: "vaccination", icon: Syringe },
      { id: "grooming", icon: Bath },
    ],
  },
  {
    id: "remote",
    services: [
      { id: "homeVisit", icon: HousePlus },
      { id: "online", icon: MessageCircle, contact: "telegram" },
    ],
  },
];
