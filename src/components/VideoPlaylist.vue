<template>
  <div class="main">
    <div class='results'>
      <div v-for="item in this.$store.state.playlist.items" :key="item.eTag">
          <SearchResult v-bind:desc="item.snippet.description"
          v-bind:image="item.snippet.thumbnails.high.url"
          v-bind:title="item.snippet.title"
          v-bind:playlist="true"
          v-bind:videoId="item.snippet.resourceId.videoId"
          v-bind:channel="item.snippet.channelTitle"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from './SearchResult.vue';

export default {
  name: 'VideoPlaylist',
  components: {
    SearchResult,
  },
  props: {
    desc: String,
    image: String,
    title: String,
    channel: String,
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
  updated() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.video{
    .iframe{
      margin: 0 auto;
    }
    .video_details{
      flex:2;
      display:flex;
      flex-direction:column;
      align-items: flex-start;
      text-align: left;
      padding: 5px;
      border-bottom: 1px solid lightgrey;
      > *{
        text-decoration: none;
        font-family: verdana;
        color: grey;
      }
      .video_details_title{
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        color: black;
        margin-bottom: 10px;
      }
      .video_stats{
        display:block;
        width:100%;
        padding: 20px 0;
        .views{
          float: left;
          padding: 10px 0;
        }
        .likes{
          padding: 10px 0;
          float: left;
          display:flex;
          align-items:center;
        }
      }
      .result_details_channel{
        font-size: 12px;
      }
      .video_like{
        width:20px;
        margin: 0 10px;
      }
    }
}

$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
@media (min-width: $breakpoint-desktop) {
.video{
    margin: 10px auto;
    padding: 80px 5px 0 5px;
    .video_details{
      padding: 20px 10px;
      .video_details_title{
        font-size: 18px;
      }
      .video_stats{
        display:inline-block;
        .likes{
          float: right;
        }
      }
    }
}
}

</style>
