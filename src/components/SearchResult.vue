<template>
  <div class="result" @click="submit">
    <div class='result_image'>
    <img v-if='channelId' class='result_thumbnail_channel' :src="`${image}`"/>
    <img v-else class='result_thumbnail' :src="`${image}`"/>
    </div>
    <div class='result_details'>
        <h2 class='result_details_title'> {{title}} </h2>
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
    playlist: Boolean,
    channel: String,
  },
  methods: {
    submit() {
      if (this.$store.state.play || this.playlist) {
        console.log('hena');
        this.$store.dispatch('setVideoID', this.videoId);
      } else if (this.videoId) {
        this.$router.replace({ name: 'video', params: { videoId: this.videoId } });
        this.$store.dispatch('getVideoDetails', this.$route.params.videoId);
        this.$store.dispatch('getRelated', this.videoId);
        this.$store.dispatch('setPlaylist', false);
      } else if (this.channelId) {
        this.$router.replace({ name: 'channel', params: { channelId: this.channelId } });
        this.$store.dispatch('getRelatedChannel', this.channelId);
        this.$store.dispatch('getChannelDetails', this.$route.params.channelId);
        this.$store.dispatch('setPlaylist', false);
      } else if (this.playlistId) {
        this.$store.dispatch('setPlaylist', true);
        this.$store.dispatch('getPlaylist', this.playlistId);
        this.$router.replace({ name: 'playlist', params: { playlistId: this.playlistId } });
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
    .result_image{
      flex: 1;
      height: 100%;
    }
    .result_thumbnail{
      width: 140px;
      height: 100px;
      object-fit: cover;
    }
    .result_thumbnail_channel{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
    .result_details{
      flex:2.5;
      height: 100%;
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
        font-size: 14px;
        font-weight: lighter;
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
        max-width: 120px;
      }
    }
}

$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
@media (min-width: $breakpoint-desktop) {
  .result{
    .result_thumbnail{
      width: 300px;
      height: 200px;
    }
    .result_details{
      flex:2;
      .result_details_title{
        font-size: 18px;
      }
      .result_details_desc{
        max-width: 500px;
      }
    }
}

}

</style>
