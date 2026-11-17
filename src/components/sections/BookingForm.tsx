"use client";

import { useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { primaryPhone } from "@/content/clinic";
import { TelegramIcon } from "@/components/ui/Icons";
import type { Dictionary } from "@/i18n/ru";
import {
  fieldLimits,
  speciesKeys,
  telegramBookingLink,
  validateBooking,
  type BookingErrorField,
  type BookingRequest,
} from "@/lib/booking";

// Сервера у сайта нет: заявка уходит сообщением из Telegram посетителя в личный чат доктора.
type Status = "editing" | "telegram";

const emptyForm: BookingRequest = { owner: "", pet: "", species: "", reason: "", phone: "" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-[#f6cdbb]">
      {message}
    </p>
  );
}

export function BookingForm({ t }: { t: Dictionary["booking"] }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<BookingErrorField[]>([]);
  const [status, setStatus] = useState<Status>("editing");

  const errorFor = (field: BookingErrorField) => (errors.includes(field) ? t.errors[field] : undefined);

  const update = (field: keyof BookingRequest, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => current.filter((item) => item !== field));
  };

  const openTelegram = () => {
    window.open(telegramBookingLink(form, t), "_blank", "noopener,noreferrer");
    setStatus("telegram");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBooking(form);
    setErrors(nextErrors);
    const [firstInvalidField] = nextErrors;
    if (firstInvalidField) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }
    openTelegram();
  };

  const reset = () => {
    setForm(emptyForm);
    setStatus("editing");
  };

  if (status === "telegram") {
    return (
      <div role="status" className="rounded-[1.75rem] bg-pine-700 p-7 sm:p-10">
        <h3 className="text-[1.75rem] leading-tight font-light tracking-[-0.02em]">{t.telegramTitle}</h3>
        <p className="mt-3 text-milk/80">{t.telegramText}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={telegramBookingLink(form, t)} target="_blank" rel="noopener noreferrer" className="btn btn-amber">
            <TelegramIcon className="size-[1.1rem]" />
            {t.openTelegram}
          </a>
          <a href={`tel:${primaryPhone.tel}`} className="btn btn-outline">
            <Phone size={18} strokeWidth={1.6} />
            {t.call}
          </a>
        </div>
        <button type="button" onClick={reset} className="mt-6 inline-flex min-h-11 items-center text-milk/70 underline underline-offset-4">
          {t.reset}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="owner" className="mb-1.5 block text-milk/85">
          {t.fields.owner}
        </label>
        <input
          id="owner"
          name="owner"
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={fieldLimits.owner}
          required
          value={form.owner}
          onChange={(event) => update("owner", event.target.value)}
          aria-invalid={errors.includes("owner")}
          aria-describedby={errors.includes("owner") ? "owner-error" : undefined}
          className="field"
        />
        <FieldError id="owner-error" message={errorFor("owner")} />
      </div>

      <div>
        <label htmlFor="pet" className="mb-1.5 block text-milk/85">
          {t.fields.pet}
        </label>
        <input
          id="pet"
          name="pet"
          autoComplete="off"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={fieldLimits.pet}
          value={form.pet}
          onChange={(event) => update("pet", event.target.value)}
          className="field"
        />
      </div>

      <fieldset className="sm:col-span-2" aria-describedby={errors.includes("species") ? "species-error" : undefined}>
        <legend className="mb-2 text-milk/85">{t.fields.species}</legend>
        <div className="flex flex-wrap gap-2">
          {speciesKeys.map((key) => (
            <label key={key}>
              <input
                type="radio"
                name="species"
                value={key}
                checked={form.species === key}
                onChange={() => update("species", key)}
                className="peer sr-only"
              />
              <span className="chip">{t.species[key]}</span>
            </label>
          ))}
        </div>
        <FieldError id="species-error" message={errorFor("species")} />
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="reason" className="mb-1.5 block text-milk/85">
          {t.fields.reason}
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          maxLength={fieldLimits.reason}
          value={form.reason}
          onChange={(event) => update("reason", event.target.value)}
          placeholder={t.fields.reasonPlaceholder}
          className="field resize-y"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="phone" className="mb-1.5 block text-milk/85">
          {t.fields.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="send"
          maxLength={fieldLimits.phone}
          required
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          placeholder="+998"
          aria-invalid={errors.includes("phone")}
          aria-describedby={errors.includes("phone") ? "phone-error" : undefined}
          className="field"
        />
        <FieldError id="phone-error" message={errorFor("phone")} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-amber w-full sm:w-auto">
          <TelegramIcon className="size-[1.1rem]" />
          {t.submit}
        </button>
        <p className="mt-3 text-sm text-milk/65">{t.telegramHint}</p>
      </div>
    </form>
  );
}
