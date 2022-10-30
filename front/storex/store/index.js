import Vuex from 'vuex'
import mainstore from './module/mainStore'
const createStore = () => {
  return new Vuex.Store({
    modules: {
      mainstore,
    },
  })
}
export default createStore