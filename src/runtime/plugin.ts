import { defineNuxtPlugin } from '#app';
import Mojo from "mojocss";
import config from '~~/mojo.config.js'

export default defineNuxtPlugin({
  name: 'mojocss-client',
  enforce: 'post',
  hooks: {
    'app:beforeMount'() {
      if (process.client) {
        Mojo(config)
      }
    }
  },
  env: {
    islands: false
  }
})
