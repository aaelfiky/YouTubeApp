<template>
  <div class="video">
    <youtube :video-id="this.$route.params.videoId" width="100%" height="500px"
    ref="youtube"></youtube>
    <div class='video_details'>
      <h2 class='video_details_title'>
      {{this.$store.state.videoDetails.items[0].snippet.title}} </h2>
    </div>
    <SearchResults/>
    <!--<button @click="playVideo">play</button>
    <img class='result_thumbnail' src="../assets/logo.png"/>
    <div class='result_details'>
        <a class='result_details_title' href="https://www.youtube.com"> {{this.$route.params.videoId}} </a>
        <a class='result_details_channel' href='https://www.youtube.com'> VIDEO</a>
        <p class='result_details_desc'> {{desc}} </p>
    </div>-->
  </div>
</template>

<script>
import SearchResults from './SearchResults.vue';

export default {
  name: 'Video',
  components: {
    SearchResults,
  },
  props: {
    desc: String,
    image: String,
    title: String,
    channel: String,
  },
  mounted() {
    this.$store.dispatch('getRelated', this.$route.params.videoId);
    this.$store.dispatch('getVideoDetails', this.$route.params.videoId);
  },
  updated() {
    // this.$store.dispatch('getRelated', this.$route.params.videoId);
    // this.$store.dispatch('getVideoDetails', this.$route.params.videoId);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.video{
    margin: 10px auto;
    padding: 80px 5px 0 5px;
    .iframe{
      margin: 0 auto;
    }
    .video_details{
      flex:2;
      height: 200px;
      display:flex;
      flex-direction:column;
      align-items: flex-start;
      text-align: left;
      padding: 0 10px;
      > *{
        text-decoration: none;
        font-family: verdana;
        color: grey;
      }
      .video_details_title{
        text-align: left;
        font-size: 18px;
        color: black;
        margin-bottom: 10px;
      }
      .result_details_channel{
        font-size: 12px;
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
