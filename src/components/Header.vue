<template>
  <div class="header">
    <img class='header_logo' src="../assets/yt.png"/>
    <input v-model="search"
    v-on:keyup="enterSearch"
    class='header_input' type='text' placeholder='Search' name='search'/>
    <button class='header_button' @click="handleClick"></button>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      search: '',
    };
  },
  props: {
    logo: String,
  },
  methods: {
    enterSearch(e) {
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    handleClick() {
      return this.submit();
    },
    submit() {
      this.$router.replace({ name: 'search-results', query: { text: this.search } });
      this.$store.dispatch('fetchResults', this.search);
      this.$store.dispatch('setSearch', this.search);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.header{
    position:fixed;
    z-index: 2;
    top:0;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: white;
    display:flex;
    width: 70%;
    padding: 10px 15%;
    margin: 0 auto;
    text-align:  center;
    align-items: center;
    border-bottom: 1px solid lightgrey;
    .header_logo{
        padding:0 30px;
    }
    .header_input{
        width: 100%;
        padding: 8px 8px;
    }
    .header_button{
        padding: 17px 17px;
        background-size: 15px auto;
        margin-left:-5px;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('../assets/search.png');
        border: 1px solid grey;
        &:focus{
          outline: none;
        }
    }
}

$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
@media (min-width: $breakpoint-tablet) {
  h1{
      font-size: 20px;
  }
}

</style>
