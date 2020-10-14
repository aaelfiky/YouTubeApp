<template>
  <div class='main'>
    <Filters v-if="Object.keys(this.$store.state.searchResults).length > 0"
    v-bind:number="this.$store.state.searchResults.pageInfo.totalResults"/>
    <div class='results'>
      <div v-for="item in this.$store.state.searchResults.items" :key="item.eTag">
        <SearchResult v-bind:desc="item.snippet.description"
        v-bind:image="item.snippet.thumbnails.high.url"
        v-bind:title="item.snippet.title"
        v-bind:videoId="item.id.videoId"
        v-bind:channelId="item.id.channelId"
        v-bind:channel="item.snippet.channelTitle"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from './SearchResult.vue';
import Filters from './Filters.vue';

export default {
  name: 'SearchResults',
  components: {
    SearchResult,
    Filters,
  },
  data() {
    return {
      search: '',
      results: this.$store.state.searchResults.items,
    };
  },
  methods: {
  },
  mounted() {
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main{
    display: block;
    width: 100%;
    > .results{
      padding-top: 80px;
      // background-color: #F9F9F9;
    }
  }
</style>
