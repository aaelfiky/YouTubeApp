<template>
  <div class="result" @click="handleClick">
    <img class='result_thumbnail' :src="`${image}`"/>
    <div class='result_details'>
        <router-link v-if="videoId" class='result_details_title'
         :to="{path: `/video/${videoId}`}"> {{title}} </router-link>
        <router-link v-if="channelId" class='result_details_title'
         :to="`/channel/${channelId}`"> {{title}} </router-link>
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
    channel: String,
  },
  methods: {
    handleClick() {
      return this.submit();
    },
    submit() {
      if (this.videoId) {
        this.$router.replace({ name: 'video', params: { videoId: this.videoId } });
        this.$store.dispatch('getRelated', this.videoId);
      } else {
        this.$store.dispatch('getRelated', this.channelId);
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
