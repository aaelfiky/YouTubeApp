import Vue from 'vue';
import Vuex from 'vuex';

const axios = require('axios');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: 'notLoading',
    count: 0,
    search: '',
    videoId: '',
    videoDetails: {},
    channelDetails: {},
    channelVideos: [],
    searchResults: [],
    playlist: [],
    fullList: [],
    play: false,
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_SEARCH(state, query) {
      state.search = query;
    },
    SET_VIDEO_ID(state, value) {
      state.videoId = value;
    },
    increment(state) {
      state.count += 1;
    },
    SET_PLAY(state, query) {
      state.play = query;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    SET_LOAD_MORE(state, results) {
      state.searchResults.items.push(results.items);
    },
    SET_PLAYLIST(state, results) {
      state.playlist = results;
    },
    SET_VIDEO_DETAILS(state, results) {
      state.videoDetails = results;
    },
    SET_CHANNEL_DETAILS(state, results) {
      state.channelDetails = results;
    },
    SET_CHANNEL_VIDEOS(state, results) {
      state.channelVideos = results;
    },
  },
  actions: {
    getVideoDetails({ commit }, videoId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,status&id=${videoId}&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_VIDEO_DETAILS', data);
        }).catch((error) => { console.log(error); });
    },
    setPlaylist({ commit }, value) {
      commit('SET_PLAY', value);
    },
    setVideoID({ commit, dispatch }, value) {
      commit('SET_LOADING_STATUS', 'loading');
      commit('SET_VIDEO_ID', value);
      dispatch('getVideoDetails', value);
      commit('SET_LOADING_STATUS', 'loading');
    },
    getPlaylist({ commit }, playlistId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${playlistId}&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_PLAY', true);
          commit('SET_PLAYLIST', data);
        }).catch((error) => { console.log(error); });
    },
    getChannelDetails({ commit }, channelId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&id=${channelId}&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_CHANNEL_DETAILS', data);
        }).catch((error) => { console.log(error); });
    },
    fetchResults({ commit }, search) {
      commit('SET_LOADING_STATUS', 'loading');
      // const myRequest = request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`)
        .then((response) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', response.data);
          commit('SET_PLAY', false);
        }).catch((error) => { console.log(error); });
    },
    loadMore({ commit, getters }, nextPage) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?pageToken=${nextPage}&part=snippet&q=${getters.getSearchQuery}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
          commit('SET_PLAY', false);
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
          commit('SET_PLAY', false);
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
          commit('SET_PLAY', false);
        }).catch((error) => { console.log(error); });
    },
    fetchResultsDate({ commit }, { search, date, order }) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&order=${order}&publishedAfter=${date}&maxResults=15&key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
          commit('SET_PLAY', false);
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
          commit('SET_PLAY', false);
        }).catch((error) => { console.log(error); });
    },
    getRelatedChannel({ commit }, channelId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAWm461T0Fm1mJ20mwleRbmj4DQlosDaG4&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_SEARCH_RESULTS', data);
          commit('SET_PLAY', false);
        }).catch((error) => { console.log(error); });
    },
    setSearch({ commit }, search) {
      commit('SET_SEARCH', search);
    },
  },
  getters: {
    getPlaylistVideoId(state) {
      if (state.playlist.length > 0) {
        return state.playlist.items[0].snippet.resourceId.videoId;
      }
      return 0;
    },
    getSearchQuery(state) {
      return state.search;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
  },
  modules: {
  },
});
