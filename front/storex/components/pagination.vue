<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="pages"
    ></v-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      page: 1,
      
    }
  },

  methods: {
    ...mapActions(['fetchProducts']),

  },

  computed: {
    ...mapGetters({
      pages: 'getpages',
    }),
  },

  watch:{
    page(){
        this.fetchProducts({
        offset: this.page,
        limit: 3,
      })
    }
  }
}
</script>
