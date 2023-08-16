import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export const commonConfig:UserConfig = {
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: '../public',
    minify: false
  }
}

// https://vitejs.dev/config/
export default defineConfig(commonConfig);
