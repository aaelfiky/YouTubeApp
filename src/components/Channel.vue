<template>
  <div class="channel" v-if="this.$store.state.channelDetails.items">
    <img class='channel_banner'
    v-bind:src="`${this.$store.state.channelDetails.items[0].
    brandingSettings.image.bannerImageUrl}`"/>
    <img class='channel_thumbnail'
    v-bind:src="`${this.$store.state.channelDetails.items[0].
    snippet.thumbnails.default.url}`"
    v-bind:height="`${this.$store.state.channelDetails.items[0].
    snippet.thumbnails.default.height}`"/>
    <div class='channel_details'>
        <label class='result_details_title'>
        {{this.$store.state.channelDetails.items[0].
    snippet.title}} </label>
        <span class='result_details_channel'> {{this.$store.state.channelDetails.items[0].
    statistics.subscriberCount}} Subscribers</span>
        <p class='result_details_desc'> {{desc}} </p>
    </div>
    <SearchResults/>
  </div>
</template>

<script>
import SearchResults from './SearchResults.vue';

export default {
  name: 'Channel',
  components: {
    SearchResults,
  },
  props: {
    banner: String,
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.channel{
    position: relative;
    display:flex;
    flex-direction:column;
    width: 100%;
    margin: 0 auto;
    .channel_banner{
      position: relative;
      height: 155px;
    }
    .channel_thumbnail{
      position: absolute;
      top:110px;
      left:50px;
      width: 90px;
      height: 90px;
      border-radius:50%;
      object-fit: cover;
    }
    .channel_details{
      flex:2;
      height: 200px;
      display:flex;
      margin-top:80px;
      flex-direction:column;
      align-items: flex-start;
      text-align: left;
      padding: 0 10px;
      > *{
        text-decoration: none;
        font-family: verdana;
        color: grey;
      }
      .result_details_title{
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
@media (min-width: $breakpoint-desktop) {
  .channel{
    margin: 10px auto;
    padding: 80px 5px 0 5px;
    .channel_banner{
      height: 175px;
    }
    .channel_thumbnail{
      position: absolute;
      top:220px;
    }
  }
}

</style>
