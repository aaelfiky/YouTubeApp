<template>
<div class='filter'>
  <div class="filter_header">
    <span class='filter_results'>About {{ number }} Results Found</span>
    <img class='filter_logo' @click="handleClick" src="../assets/filter.png"/>
  </div>
  <div v-bind:class="{ 'filters': filterToggle }">
    <div class='filter_options'>
      <div class='filter_date'>
        <label>UPLOAD DATE</label>
        <label>Last Hour</label>
        <label>Today</label>
        <label>This Week</label>
        <label>This Month</label>
      </div>
      <div class='filter_type'>
        <label>TYPE</label>
        <div class="filter_label">
          <span v-bind:class="{ active: type === 'video' }"
            @click="type = 'video';typeClick();">Video
          </span>
          <strong v-bind:class = "{ 'close': type === 'video' }"
          @click="type = '';typeClick();"> X </strong>
        </div>
        <div class="filter_label">
          <span v-bind:class="{ active: type === 'channel' }"
            @click="type = 'channel';typeClick();">Channel
          </span>
          <strong v-bind:class="{ 'close': type === 'channel' }"
          @click="type = '';typeClick();"> X </strong>
        </div>
        <div class="filter_label">
          <span v-bind:class="{ active: type === 'playlist' }"
            @click="type = 'playlist';typeClick();">Playlist
          </span>
          <strong v-bind:class="{ 'close': type === 'playlist' }"
          @click="type = '';typeClick();"> X </strong>
        </div>
      </div>
      <div class='filter_sort'>
        <label>SORT BY</label>
        <label v-bind:class="{ active: order === 'relevance' }"
        @click="order = 'relevance';sortClick();">Relevance</label>
        <label v-bind:class="{ active: order === 'date' }"
        @click="order = 'date';sortClick();">Upload Date</label>
        <label v-bind:class="{ active: order === 'viewCount' }"
        @click="order = 'viewCount';sortClick();">View Count</label>
        <label v-bind:class="{ active: order === 'rating' }"
        @click="order = 'rating';sortClick();">Rating</label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Filters',
  data() {
    return {
      search: '',
      order: 'relevance',
      type: '',
      filterToggle: true,
    };
  },
  props: {
    logo: String,
    number: Number,
  },
  methods: {
    enterSearch(e) {
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    sortClick() {
      this.$store.dispatch('fetchResultsOrdered', { search: this.$store.state.search, order: this.order });
    },
    typeClick() {
      this.$store.dispatch('fetchResultsType', { search: this.$store.state.search, type: this.type, order: this.order });
    },
    handleClick() {
      this.filterToggle = !this.filterToggle;
    },
    submit() {
      // this.$router.push({ name: 'search-results', query: { text: this.search } });
      this.$store.dispatch('setSearch', this.search);
      this.$store.dispatch('fetchResults', this.search);
    },
  },
  mounted() {
  },
  computed: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .filter,
.filter_header{
    background-color: white;
    display:flex;
    margin: 100px auto 0 5px;
    text-align:  center;
    align-items: flex-start;
    border-bottom: 1px solid lightgrey;
    .filter_logo{
      cursor:pointer;
      float:right;
      padding: 5px 30px;
      width: 20px;
      height: 20px;
    }
    .filter_results{
      text-align: left;
      flex:1;
      width: 100%;
      padding: 8px 8px;
    }
}
.filters{
  display: none;
}

.filter_options{
  display: flex;
  flex-direction: row;
  text-align:left;
  width: 100%;
  padding: 8px 8px;
  > *{
    flex:1;
    display:flex;
    flex-direction:column;
    padding: 8px;
    margin: 2px;
  }
  label{
    margin: 10px 0;
    cursor:pointer;
  }
  .active{
    font-weight:bolder;
  }
  label:first-of-type{
    padding: 10px 0;
    font-weight: bold;
    border-bottom: 1px solid lightgrey;
  }
  .filter_label{
    margin: 10px 0;
    span{
      cursor: pointer;
    }
    strong{
      display: none;
      padding-left: 10px;
      cursor: pointer;
    }
    .close{
      display: inline-block;
      margin-left:20px;
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
