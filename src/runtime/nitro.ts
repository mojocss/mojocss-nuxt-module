import { defineNitroPlugin } from '#imports'
import MojoSCG from "mojocss/src/interop/scg.js";
import config from '~~/mojo.config.js'

process.env.NODE_NO_WARNINGS = '1';
process.removeAllListeners('warning')

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const css: string[] = [];
    html.body = html.body.map((chunk: string) => {

      const ssr = new MojoSCG(chunk, config);
      css.push(ssr.render());

      return ssr.document.body.innerHTML;
    })

    html.head.push(`<style type="text/css" mojo-auto-generated>${css.join("\n")}</style>`)
  })
})
