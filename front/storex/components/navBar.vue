<template>
  <div>
    <v-row class="big_container">
      <v-col cols="12">
        <SearchBar />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AddProduct from './addProduct.vue'
import SearchBar from './search.vue'
export default {
  name: 'NavBar',
  data: () => ({
    collapseOnScroll: true,
    addDialog: false,
  }),
  methods: {
    ...mapMutations(['dialogemut']),
    openCreateDialog() {
      this.addDialog = true
    },
    close() {
      this.addDialog = false
    },
    add(data) {
      this.dialogemut(data)
    },
  },
  components: { AddProduct, SearchBar },
}
</script>

<style lang="css" scoped>
* {
  padding: 0;
}
.container-app {
  width: 100%;
}

.big_container {
  width: 100%;

}
</style>
