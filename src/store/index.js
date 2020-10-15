import Vue from 'vue';
import Vuex from 'vuex';
import VueYoutube from 'vue-youtube';
import vueTopprogress from 'vue-top-progress';

Vue.use(vueTopprogress);
Vue.use(Vuex);
Vue.use(VueYoutube);

export default new Vuex.Store({
  state: {
    loadingStatus: 'notLoading',
    search: '',
    videoDetails: {},
    channelDetails: {},
    channelVideos: [],
    searchResults: [],
    playlist: [],
    play: false,
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_SEARCH(state, query) {
      state.search = query;
    },
    SET_PLAY(state, query) {
      state.play = query;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
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
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_VIDEO_DETAILS', data);
        }).catch((error) => { console.log(error); });
    },
    getPlaylist({ commit }, playlistId) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${playlistId}&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
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
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&id=${channelId}&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
      fetch(myRequest)
        .then((response) => (response.json()))
        .then((data) => {
          console.log(data);
          commit('SET_LOADING_STATUS', 'notLoading');
          commit('SET_CHANNEL_DETAILS', data);
        }).catch((error) => { console.log(error); });
    },
    fetchResults({ commit }, search) {
      commit('SET_LOADING_STATUS', 'loading');
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=15&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
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
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&order=${order}&maxResults=15&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
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
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&order=${order}&type=${type}&maxResults=15&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
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
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=15&key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw`);
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
      const myRequest = new Request(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrD2goPgmoHuCT92HqjCyemAyqV30tdpw&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`);
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
  },
  modules: {
  },
});
