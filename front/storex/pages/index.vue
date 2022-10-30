<template>
  <div>
    <v-app>
      
      <NavBar />

      <product />

      <addProduct />
      <PaginationVue />
    </v-app>
  </div>
</template>

<script>
import NavBar from '../components/navBar.vue'
import product from '../components/products.vue'
import addProduct from '../components/addProduct.vue'
import SearchBar from '../components/search.vue'
import PaginationVue from '../components/pagination.vue'

export default {
  name: 'IndexPage',

  components: {
    NavBar,
    product,
    addProduct,
    SearchBar,
    PaginationVue,
  },
}
</script>
