module.exports = {
  pwa: {
    // configure the workbox plugin
    name: 'Lidotel Venezuela',
    themeColor: '#94700a',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    },
    iconPaths: {
        favicon16: 'img/icon/favicon.ico'
   /* favicon32: 'img/icon/favicon-32x32.png',
      favicon16: 'img/icon/favicon-16x16.png'*/
    }
  },  
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
