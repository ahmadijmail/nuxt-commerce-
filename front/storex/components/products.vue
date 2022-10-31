<template>
  <div>
    <v-btn
      class="addbutt"
      fab
      dark
      color="black
"
      @click="openCreateDialog"
    >
      <v-icon> mdi-plus </v-icon>
    </v-btn>
    <v-row no-gutters :key="refreshing">
      <v-card
        @click="$router.push(`/product/${product.id}`)"
        v-for="product in products"
        class="card mx-auto my-12"
        max-width="500"
        min-width="500"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="300" class="pic" :src="product.image"></v-img>

        <v-card-title class="prodname">{{ product.name }}</v-card-title>
        <v-card-title class="date">Date: {{ product.date }}</v-card-title>
        <v-card-title>Sellers</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip v-for="user in product.users">{{ user.user.name }}</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text>
            Price: {{ product.price }} $
          </v-btn>
          <div class="buttons">
            <v-btn
              id="delete"
              text
              @click="deletep(product.id), (statuss = !statuss)"
            >
              Delete
            </v-btn>
          </div>

          <updateProduct :product="product" />
        </v-card-actions>
      </v-card>
    </v-row>
    <template v-if="addDialog">
      <AddProduct :dialog="addDialog" @close="close" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import updateProduct from './updateProduct.vue'
export default {
  name: 'productsload',
  data: () => ({
    collapseOnScroll: true,
    addDialog: false,

    selection: 1,
    statuss: false,
    refreshing: 0,
  }),
  methods: {
    // ...mapMutations(['fetchTask']),
    ...mapActions(['fetchProducts', 'deleteProduct']),
    ...mapMutations(['dialogemut']),
    async deletep(id) {
      console.log(id)
      await this.deleteProduct(id)
    },

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

  created() {
    this.fetchProducts({ offset: 1, limit: 3 })
  },

  computed: {
    ...mapGetters({
      products: 'getProducts',
    }),
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.card {

  margin: 50px;
  padding-left: 10px;
}
.pic {
  top: 20px;
  align-items: center;
  right: 5px;
}

.prodname {
  margin-top: 20px;
}

#delete {
  margin: 5px;
  background: red;
  // left: 40%;
}

#update {
  background: blueviolet;
  //left: 40%;
}

.buttons {
  margin-left: 12%;
}

.addbutt {
  min-width: 100px;
  min-height: 100px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
