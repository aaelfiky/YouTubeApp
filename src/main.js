import Vue from 'vue';
import VueRouter from 'vue-router';
import vueTopprogress from 'vue-top-progress';
import VueYoutube from 'vue-youtube';
import App from './App.vue';
import store from './store';
import SearchResults from './components/SearchResults.vue';
import Video from './components/Video.vue';
import Channel from './components/Channel.vue';
import Playlist from './components/Playlist.vue';

Vue.use(VueRouter);
Vue.use(vueTopprogress);
Vue.use(VueYoutube);

const router = new VueRouter({
  routes: [
    {
      path: '/video/:videoId', name: 'video', component: Video, props: true,
    },
    {
      path: '/channel/:channelId', name: 'channel', component: Channel, props: true,
    },
    {
      path: '/playlist/:playlistId', name: 'playlist', component: Playlist, props: true,
    },
    {
      path: '/search', name: 'search-results', component: SearchResults, props: true,
    },
    {
      path: '/', name: 'home', props: true,
    },
  ],
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
