<template>
  <div id="app">
    <vue-topprogress ref="topProgress" color='red'></vue-topprogress>
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import { vueTopprogress } from 'vue-top-progress';
import { mapState } from 'vuex';
import Header from './components/Header.vue';

export default {
  name: 'App',
  data() {
    return {
      scrolledToBottom: false,
    };
  },
  components: {
    Header,
    vueTopprogress,
  },
  methods: {
  },
  mounted() {
  },
  computed: mapState(['loadingStatus']),
  watch: {
    loadingStatus(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      // Do whatever makes sense now
      if (newValue === 'loading') {
        this.$refs.topProgress.start();
      } else {
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
