import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import SearchResults from './components/SearchResults.vue';
import Video from './components/Video.vue';
import Channel from './components/Channel.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/video/:videoId', name: 'video', component: Video, props: true,
    },
    {
      path: '/channel/:channelId', name: 'channel', component: Channel, props: true,
    },
    {
      path: '/search', name: 'search-results', component: SearchResults, props: true,
    },
    // { path: '/', component: SearchResults },
  ],
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
