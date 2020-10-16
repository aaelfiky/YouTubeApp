<template>
<div class='filter'>
  <select name="type" @change="onChangeType($event)" class="form-control" v-model="type">
    <option value="">All</option>
    <option value="video">Video</option>
    <option value="channel">Channel</option>
    <option value="playlist">Playlist</option>
  </select>
  <select name="date" @change="onChange($event)" class="form-control" v-model="date">
    <option value="">Any Time</option>
    <option value="hour">Last hour</option>
    <option value="today">Today</option>
    <option value="week">Last Week</option>
    <option value="month">Last Month</option>
  </select>
</div>
</template>

<script>
export default {
  name: 'FiltersMobile',
  data() {
    return {
      search: '',
      order: 'relevance',
      type: '',
      date: '',
      filterToggle: true,
    };
  },
  props: {
    logo: String,
    number: Number,
  },
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
    onChange(event) {
      console.log(event.target.value);
      const dateNow = new Date();
      // const hour = 1000 * 60 * 60;
      const anHourAgo = new Date(dateNow.getTime() - (1000 * 60 * 60));
      // const dateNow_f = dateNow.toISOString();
      switch (event.target.value) {
        case 'hour':
          // code block
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: anHourAgo.toISOString(), order: 'relevance' });
          break;
        case 'today':
          // code block
          dateNow.setDate(dateNow.getDate() - 1);
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: dateNow.toISOString(), order: 'relevance' });
          break;
        case 'week':
          // code block
          dateNow.setDate(dateNow.getDate() - 7);
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: dateNow.toISOString(), order: 'relevance' });
          break;
        case 'month':
          // code block
          dateNow.setDate(dateNow.getDate() - 30);
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: dateNow.toISOString(), order: 'relevance' });
          break;
        default:
          // code block
          this.$store.dispatch('fetchResultsOrdered', { search: this.$store.state.search, order: 'relevance' });
          break;
      }
    },
    onChangeType(event) {
      console.log(event.target.value);
      this.$store.dispatch('fetchResultsType', { search: this.$store.state.search, type: event.target.value, order: 'relevance' });
    },
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
    dateClick() {
      const dateNow = new Date();
      // const hour = 1000 * 60 * 60;
      const anHourAgo = new Date(dateNow.getTime() - (1000 * 60 * 60));
      // const dateNow_f = dateNow.toISOString();
      switch (this.date) {
        case 'hour':
          // code block
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: anHourAgo.toISOString(), order: this.order });
          break;
        case 'today':
          // code block
          dateNow.setDate(dateNow.getDate() - 1);
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: dateNow.toISOString(), order: this.order });
          break;
        case 'week':
          // code block
          dateNow.setDate(dateNow.getDate() - 7);
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: dateNow.toISOString(), order: this.order });
          break;
        case 'month':
          // code block
          dateNow.setDate(dateNow.getDate() - 30);
          this.$store.dispatch('fetchResultsDate', { search: this.$store.state.search, date: dateNow.toISOString(), order: this.order });
          break;
        default:
          // code block
          this.$store.dispatch('fetchResultsOrdered', { search: this.$store.state.search, order: this.order });
          break;
      }
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
.filter{
  display: flex;
  select{
    padding:10px 20px;
    margin: 10px;
    background-color: whitesmoke;
    border-radius: 5px;
    -webkit-appearance: none;
  }
}
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
