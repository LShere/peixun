import Vue from 'vue'
import Vuex from 'vuex'

import base from './modules/base';
import movie from './modules/movie'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    base,
    movie
  }
})
