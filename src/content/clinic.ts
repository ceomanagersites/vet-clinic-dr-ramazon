// Факты, которые не зависят от языка. Тексты и адрес для каждого языка лежат в src/i18n.
export const clinic = {
  name: "Veterinary Clinic Dr.Ramazon",
  hours: "09:00–23:00",
  postalCode: "100006",
  // Совпадают в Google Картах и 2ГИС с точностью до нескольких метров.
  geo: { latitude: 41.326266, longitude: 69.304817 },
  phones: [
    { display: "+998 55 520 72 70", tel: "+998555207270" },
    { display: "+998 95 088 72 70", tel: "+998950887270" },
    { display: "+998 90 053 64 64", tel: "+998900536464" },
  ],
  social: {
    instagram: "https://www.instagram.com/vetdrramazan",
    facebook: "https://www.facebook.com/people/vetdrramazan/100088117397640/",
    telegram: "https://t.me/vetdrramazan",
  },
  // Личный чат доктора: так он указан в разделе онлайн-консультации на linktr.ee/vetdrramazan.
  telegramChat: "https://t.me/vetdoctorramazan",
  maps: {
    widget: "https://yandex.uz/map-widget/v1/?ll=69.304817%2C41.326266&pt=69.304817%2C41.326266%2Cpm2dgl&z=16",
    yandex: "https://yandex.uz/maps/org/veterinary_clinic_dr_ramazon/124220536939/",
    route: "https://yandex.uz/maps/?rtext=~41.326266%2C69.304817&rtt=auto",
    google: "https://www.google.com/maps/dir/?api=1&destination=41.326266%2C69.304817",
    twoGis: "https://2gis.uz/tashkent/firm/70000001069022228",
  },
  reviews: {
    yandex: "https://yandex.uz/maps/org/veterinary_clinic_dr_ramazon/124220536939/reviews/",
    google: "https://www.google.com/maps/place/Veterinary+Clinic+Dr.+Ramazon/@41.3262659,69.3048167,17z",
    twoGis: "https://2gis.uz/tashkent/firm/70000001069022228/tab/reviews",
  },
} as const;

export const primaryPhone = clinic.phones[0];
