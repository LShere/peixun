import mutations  from './movie/mutations'
import getters from './movie/getters'
import actions from './movie/actions'

const state = {
    inTheaterArr: [],
    comingArr: [],
    movieId: '',
    commentsArr: [],
    reviewsArr: []

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}