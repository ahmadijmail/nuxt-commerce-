import axios from 'axios'

const mainstore = {
  nameSpase: true,
  state: {
    products: [],
    dialoge: false,
    pages: 1,
  },

  actions: {
    async fetchProducts({ commit }, search) {
      console.log(search, 'ssssss')
      try {
        let data = await axios.post(
          'http://localhost:30202/products/getProducts',
          search
        )
        commit('fetchTask', data.data)
        return data.data.rows
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async addProduct({ commit }, product) {
      try {
        let data = await axios.post(
          'http://localhost:30202/products/createProduct',
          product
        )

        commit('addProduct1', data.data)

        console.log(data)
        return data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async deleteProduct({ commit }, id) {
      console.log(id)
      commit('deleteProduct', id)
      try {
        let data = await axios.post(
          'http://localhost:30202/products/deleteProduct',
          { id: id }
        )
        return data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async updateProductfetch({ commit }, newProduct) {
      try {
        let data = await axios.post(
          'http://localhost:30202/products/updateProduct',
          newProduct
        )
        commit('updateProduct', data.data)
        return data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },

  mutations: {
    fetchTask(state, payload) {
      return (state.products = payload.rows), (state.pages = payload.pages)
    },
    fetchpp(state, payload) {
      return (state.all = payload)
    },

    deleteProduct(state, id) {
      return (state.products = state.products.filter((e) => e.id !== id))
    },

    addProduct1(state, payload) {
      return state.products.push(payload)
    },

    updateProduct(state, payload) {
      return (state.products = state.products.map((el) =>
        el.id == payload.id ? (el = payload) : el
      ))
    },

    dialogemut(state) {
      return (state.dialoge = !state.dialoge)
    },
  },
  getters: {
    getProducts: (state) => state.products,
    openDialoge: (state) => state.dialoge,
    getpages: (state) => state.pages,
  
  },
}
export default mainstore
