// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/color-mode", "@pinia/nuxt", "@nuxtjs/tailwindcss"],
  colorMode: {
    preference: "dark", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
  // ssr: false,
  css: [
    // SCSS file in the project
    "@/assets/css/main.scss",
    "@/assets/css/tailwind.css",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Salma | Pokemon App",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          href: "https://fonts.cdnfonts.com/css/clash-display",
          rel: "stylesheet",
        },
        {
          href: "https://fonts.cdnfonts.com/css/general-sans",
          rel: "stylesheet",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
});
