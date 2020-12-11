module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/mngsav/'
  : '/',
  pwa: {
    workboxPluginMode: 'InjectManifest',
     workboxOptions: {
      swSrc: 'src/service-worker.js'
    },
    name: "Manga Saver",
    themeColor: "#7E57C2"
  }
}