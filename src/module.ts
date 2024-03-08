import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import fs from "fs";


// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'mojocss-nuxt',
    configKey: 'mojocss',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const rootResolver = createResolver(nuxt.options.rootDir || nuxt.options.srcDir)
    const configPath = rootResolver.resolve("./mojo.config.js");

    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, "export default {\n" +
        "  base: {\n" +
        "    themes: {\n" +
        "      default: {\n" +
        "        // ...\n" +
        "      },\n" +
        "    },\n" +
        "  },\n" +
        "  patterns: {\n" +
        "    // ...\n" +
        "  },\n" +
        "}");
    }

    if(!nuxt.options.watch)
      nuxt.options.watch = [];
    nuxt.options.watch.push("!mojo.config.js");

    let isReloading = false;
    fs.watch(configPath, async (eventType) => {
      if (eventType === 'change' && !isReloading) {
        isReloading = true;
        console.log('\x1b[34mℹ \x1b[32mmojo.config.js\x1b[0m file has been changed. Reloading the Nuxt server...\x1b[0m');
        try {
          nuxt.server.reload();
        } catch (e) {
          console.log(e)
        }

        setTimeout(() => {
          isReloading = false;
        }, 1000);
      }
    });

    addPlugin(resolver.resolve('./runtime/plugin'));

    if(!nuxt.options.nitro.plugins)
      nuxt.options.nitro.plugins = [];
    nuxt.options.nitro.plugins.push(resolver.resolve('./runtime/nitro'));
  }
})
