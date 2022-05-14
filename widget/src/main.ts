import { createApp } from 'vue'
import Playground from './views/Playground/index.vue'
import App from './App.vue'
import 'animate.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import { setup } from '@/utils/bootstrap'

setup({
  onProduction: () => {
    createApp(App).mount('#app')
  },
  onDevelopment: () => {
    createApp(Playground).mount('#app')
  }
})
