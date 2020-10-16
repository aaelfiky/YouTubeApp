<template>
  <div class="header">
    <img v-if="!isMobile()" class='header_logo' src="../assets/yt.png"/>
    <img v-if="isMobile()" class='header_logo' src="../assets/yt-mob-2.png"/>
    <input v-model="search" v-on:keyup="enterSearch"
    class='header_input' type='text' placeholder='YouTube' name='search'/>
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
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
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
      // this.$store.dispatch('fetchResults', this.search);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$breakpoint-desktop: 1024px;
.header{
  position:relative;
  display:flex;
  background-color: red;
  width:100%;
  height: 65px;
  .header_logo{
    width:60px;
    height:60px;
    padding:0 20px;
    float:left;
  }
  ::placeholder {
    color: white;
    font-size: 13px;
  }
  .header_input{
    width: 55%;
    background-color: transparent;
    border:none;
    color:white;
    &:focus{
      outline:none;
    }
  }
  .header_button{
    padding: 14px 14px;
    background-size: 20px auto;
    margin-left:-5px;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('../assets/search-2.png');
    background-color: transparent;
    border:0;
    &:focus{
      outline: none;
    }
  }
}
@media (min-width: $breakpoint-desktop) {
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
    ::placeholder {
      color: grey;
      font-size: 16px;
    }
    .header_logo{
        padding:0 30px;
        width:170px;
        height:50px;
        float:none;
    }
    .header_input{
        width: 100%;
        padding: 10px 10px;
        color:grey;
        border: 1px solid lightgrey;
    }
    .header_button{
        padding: 18px 18px;
        background-size: 15px auto;
        background-color: #d4d4d4;
        background-image: url('../assets/search.png');
        border: 1px solid grey;
        &:focus{
          outline: none;
        }
    }
  }
}

</style>
