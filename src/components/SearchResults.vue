<template>
  <div class='main'>
    <div v-bind:class="{ 'no-display': route !== 'search-results' }">
      <FiltersMobile v-if="isMobile() &&
      Object.keys(this.$store.state.searchResults).length > 0"
      v-bind:number="this.$store.state.searchResults.pageInfo.totalResults"/>
      <Filters v-if="!isMobile() && Object.keys(this.$store.state.searchResults).length > 0"
      v-bind:number="this.$store.state.searchResults.pageInfo.totalResults"/>
    </div>
    <div v-if="!this.$store.state.play" class='results'>
      <div v-for="item in this.$store.state.searchResults.items" :key="item.eTag">
        <SearchResult v-bind:desc="item.snippet.description"
        v-bind:image="item.snippet.thumbnails.high.url"
        v-bind:title="item.snippet.title"
        v-bind:kind="item.id.kind"
        v-bind:videoId="item.id.videoId"
        v-bind:channelId="item.id.channelId"
        v-bind:playlistId="item.id.playlistId"
        v-bind:channel="item.snippet.channelTitle"/>
      </div>
      <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
    </div>
    <div v-else class='results'>
      <div v-for="item in this.$store.state.playlist.items" :key="item.eTag">
          <SearchResult v-bind:desc="item.snippet.description"
          v-bind:image="item.snippet.thumbnails.high.url"
          v-bind:title="item.snippet.title"
          v-bind:videoId="item.id.videoId"
          v-bind:kind="item.id.kind"
          v-bind:channelId="item.id.channelId"
          v-bind:playlistId="playlistId"
          v-bind:channel="item.snippet.channelTitle"/>
      </div>
      <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
    </div>
  </div>
</template>

<script>
// import InfiniteLoading from 'vue-infinite-loading';
import SearchResult from './SearchResult.vue';
import Filters from './Filters.vue';
import FiltersMobile from './FiltersMobile.vue';

export default {
  name: 'SearchResults',
  components: {
    // InfiniteLoading,
    SearchResult,
    Filters,
    FiltersMobile,
  },
  props: {
    filter: Boolean,
    playlistId: String,
  },
  data() {
    return {
      search: this.$route.query.text,
      route: this.$route.name,
      // filter: true,
      results: this.$store.state.searchResults.items,
    };
  },
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
    getResults(value) {
      this.$store.dispatch('fetchResults', value);
      this.$store.dispatch('setSearch', value);
    },
  },
  mounted() {
    if (this.route === 'search-results') {
      this.getResults(this.search);
      console.log(this.$store.getters.getSearchResults.kind);
    }
  },
  watch: {
    $route(to) {
      if (to) {
        console.log(this.$store.getters.getSearchResults.kind);
        this.search = to.query.text;
        this.getResults(to.query.text);
      }
    },
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
      padding-top: 20px;
      // background-color: #F9F9F9;
    }
  }
</style>
