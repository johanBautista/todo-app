import 'vue-i18n'

declare module 'vue-i18n' {
  interface DefineLocaleMessage {
    welcome: string
    greeting: string
    buttons: {
      submit: string
      cancel: string
    }
  }
}
