<template>
  <div class='main'>
    <vue-topprogress ref="topProgress" color='red'></vue-topprogress>
    <div v-bind:class="{ 'no-display': route !== 'search-results' }">
      <Filters v-if="Object.keys(this.$store.state.searchResults).length > 0"
      v-bind:number="this.$store.state.searchResults.pageInfo.totalResults"/>
    </div>
    <div v-if="!this.$store.state.play" class='results'>
      <div v-for="item in this.$store.state.searchResults.items" :key="item.eTag">
        <SearchResult v-bind:desc="item.snippet.description"
        v-bind:image="item.snippet.thumbnails.high.url"
        v-bind:title="item.snippet.title"
        v-bind:videoId="item.id.videoId"
        v-bind:channelId="item.id.channelId"
        v-bind:playlistId="item.id.playlistId"
        v-bind:channel="item.snippet.channelTitle"/>
      </div>
    </div>
    <div v-if="this.$store.state.play" class='results'>
      <div v-for="item in this.$store.state.playlist.items" :key="item.eTag">
          <SearchResult v-bind:desc="item.snippet.description"
          v-bind:image="item.snippet.thumbnails.high.url"
          v-bind:title="item.snippet.title"
          v-bind:videoId="item.id.videoId"
          v-bind:channelId="item.id.channelId"
          v-bind:playlistId="item.id.playlistId"
          v-bind:channel="item.snippet.channelTitle"/>
        </div>
      </div>
  </div>
</template>

<script>
import { vueTopprogress } from 'vue-top-progress';
import SearchResult from './SearchResult.vue';
import Filters from './Filters.vue';

export default {
  name: 'SearchResults',
  components: {
    SearchResult,
    Filters,
    vueTopprogress,
  },
  props: {
    filter: Boolean,
  },
  data() {
    return {
      search: '',
      route: this.$route.name,
      // filter: true,
      results: this.$store.state.searchResults.items,
    };
  },
  methods: {
  },
  mounted() {
  },
  beforeUpdate() {
    this.$refs.topProgress.start();
  },
  updated() {
    this.$refs.topProgress.done();
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main{
    display: block;
    width: 100%;
    .no-display{
      display: none;
    }
    > .results{
      padding-top: 40px;
      // background-color: #F9F9F9;
    }
  }
</style>
