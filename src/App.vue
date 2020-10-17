<template>
  <div id="app">
    <vue-topprogress ref="topProgress" color='red'></vue-topprogress>
    <Header/>
    <loading v-if="isMobile()" class='loading' :active.sync="loading"
     :can-cancel="true"
     :color="color"
     :is-full-page="false"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { vueTopprogress } from 'vue-top-progress';
import Loading from 'vue-loading-overlay';
import { mapState } from 'vuex';
import Header from './components/Header.vue';

// Vue.use(Loading);
export default {
  name: 'App',
  data() {
    return {
      scrolledToBottom: false,
      loading: false,
      color: '#FF0000',
    };
  },
  components: {
    Header,
    vueTopprogress,
    Loading,
  },
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
  },
  mounted() {
  },
  computed: mapState(['loadingStatus']),
  watch: {
    loadingStatus(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      // Do whatever makes sense now
      if (newValue === 'loading') {
        this.loading = true;
        this.$refs.topProgress.start();
      } else {
        this.loading = false;
        this.$refs.topProgress.done();
      }
    },
  },
};

</script>

<style lang="scss">
$breakpoint-desktop: 1024px;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin:0;
  .loading{
    margin: 10px 0;
  }
}
@media (min-width: $breakpoint-desktop) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 70%;
    padding: 10px 15%;
    margin: 0 auto;
  }
}
</style>
