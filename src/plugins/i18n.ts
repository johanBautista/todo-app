import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

// Definir los mensajes de traducción
const messages = {
  en,
  es,
}

// Configurar vue-i18n
const i18n = createI18n({
  legacy: false, // Usar la API de composición (Vue 3)
  locale: 'en', // Idioma predeterminado
  fallbackLocale: 'en', // Idioma de respaldo
  messages, // Mensajes de traducción
})

export default i18n
