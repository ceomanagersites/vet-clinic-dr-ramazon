import { clinic } from "@/content/clinic";
import { FacebookIcon, InstagramIcon, TelegramIcon } from "@/components/ui/Icons";

const links = [
  { href: clinic.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: clinic.social.telegram, label: "Telegram", Icon: TelegramIcon },
  { href: clinic.social.facebook, label: "Facebook", Icon: FacebookIcon },
];

export function SocialLinks({ suffix, className = "" }: { suffix: string; className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}: ${suffix}`}
            className="grid size-12 place-items-center rounded-full border border-current/25 transition duration-160 hover:border-current active:scale-95"
          >
            <Icon className="size-[1.15rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
