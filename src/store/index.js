import Vue from 'vue';
import Vuex from 'vuex';
import VueYoutube from 'vue-youtube';

Vue.use(Vuex);
Vue.use(VueYoutube);

export default new Vuex.Store({
  state: {
    loadingStatus: 'notLoading',
    search: '',
    videoDetails: {},
    searchResults: [],
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_SEARCH(state, query) {
      state.search = query;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    SET_VIDEO_DETAILS(state, results) {
      state.videoDetails = results;
    },
  },
  actions: {
    getVideoDetails({ commit }, videoId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_VIDEO_DETAILS', data);
        }).catch((error) => { console.log(error); });
    },
    fetchResults({ commit }, search) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
        }).catch((error) => { console.log(error); });
    },
    fetchResultsOrdered({ commit }, { search, order }) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&order=${order}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
        }).catch((error) => { console.log(error); });
    },
    fetchResultsType({ commit }, { search, type, order }) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&order=${order}&type=${type}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
        }).catch((error) => { console.log(error); });
    },
    getRelated({ commit }, videoId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
        }).catch((error) => { console.log(error); });
    },
    setSearch({ commit }, search) {
      commit('SET_SEARCH', search);
    },
  },
  getters: {
  },
  modules: {
  },
});
