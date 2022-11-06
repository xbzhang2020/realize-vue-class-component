import Vue from 'vue'
import App from './App.vue'

import './components/decorator_example'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
