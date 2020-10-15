<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
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
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop,
          document.body.scrollTop)
          + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.scrolledToBottom = true; // replace it with your code
        }
      };
    },
  },
  mounted() {
    this.scroll();
  },
};

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 70%;
  padding: 10px 15%;
  margin: 0 auto;
  // margin-top: 60px;
}
body{
  margin:0;
}
</style>
