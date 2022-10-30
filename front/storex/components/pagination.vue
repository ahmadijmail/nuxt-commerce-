<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="pages"
      @input="pagnation"
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
    pagnation(page) {
      this.fetchProducts({
        offset: page,
        limit: 3,
      })
    },
  },

  computed: {
    ...mapGetters({
      pages: 'getpages',
    }),
  },
}
</script>
