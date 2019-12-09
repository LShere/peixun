import mutations  from './base/mutations'
import getters from './base/getters'
import actions from './base/actions'

const state = {
    Loading: false
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}