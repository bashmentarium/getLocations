import enEn from "./enEn";

const messages = {
  en: enEn
};

export default function getLocaleMessages(locale) {
  return messages[locale] || messages.en;
}
