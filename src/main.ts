import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'
import contextMixin from '@/plugins/context'
Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

new Vue({
  router,
  mixins: [contextMixin],
  render: h => h(App)
}).$mount('#app')
