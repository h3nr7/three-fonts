import { defineConfig, UserConfig } from 'vite'
import {commonConfig } from './vite.config'

const prodConfig:UserConfig = {
  ...commonConfig,
  build: {
    ...commonConfig.build,
    minify: 'esbuild'
  }
}


// https://vitejs.dev/config/
export default defineConfig(prodConfig);
