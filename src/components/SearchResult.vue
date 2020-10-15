<template>
  <div class="result" @click="submit">
    <img class='result_thumbnail' :src="`${image}`"/>
    <div class='result_details'>
        <h2 v-if="videoId" class='result_details_title'
         > {{title}} </h2>
         <h2 v-if="playlistId" class='result_details_title'
         > {{title}} </h2>
        <router-link v-if="channelId" class='result_details_title'
         :to="`/channel/${channelId}`"> {{title}} </router-link>
         <h2 v-if="this.$store.state.play" class='result_details_title'
         > {{title}} </h2>
        <a class='result_details_channel' href='https://www.youtube.com'> {{channel}}</a>
        <p class='result_details_desc'> {{desc}} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    desc: String,
    image: String,
    title: String,
    videoId: String,
    channelId: String,
    playlistId: String,
    channel: String,
  },
  methods: {
    submit() {
      if (this.videoId) {
        this.$router.replace({ name: 'video', params: { videoId: this.videoId } });
        this.$store.dispatch('getVideoDetails', this.$route.params.videoId);
        this.$store.dispatch('getRelated', this.videoId);
      } else if (this.channelId) {
        this.$router.replace({ name: 'channel', params: { channelId: this.channelId } });
        this.$store.dispatch('getRelatedChannel', this.channelId);
        this.$store.dispatch('getChannelDetails', this.$route.params.channelId);
      } else {
        this.$store.dispatch('getPlaylist', this.playlistId);
        this.$router.replace({ name: 'playlist', params: { playlistId: this.playlistId } });
        // this.$store.dispatch('getRelated', this.videoId);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.result{
    cursor: pointer;
    display: flex;
    flex-direction: row;
    margin: 10px auto;
  text-align:  center;
    align-items: center;
    padding: 0 5px;
    .result_thumbnail{
      width: 300px;
      height: 200px;
      object-fit: cover;
    }
    .result_details{
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
      .result_details_title{
        font-size: 18px;
        color: black;
        margin-bottom: 10px;
      }
      .result_details_channel{
        font-size: 12px;
      }
      .result_details_desc{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 500px;
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
