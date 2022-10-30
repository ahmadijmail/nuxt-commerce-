<template>
  <div data-app>
    <v-row justify="center">
      <v-dialog v-model="dialogeStatus" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" id="updatebtn" dark v-bind="attrs" v-on="on">
            Update Product
          </v-btn>
        </template>
        <v-card>
          <v-form validate>
            <v-card-title>
              <span class="text-h5">Add Product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Product Name*"
                      v-model="ProductName"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Product Image*"
                      required
                      v-model="image"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Price $"
                      required
                      v-model="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6"> </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      :items="users"
                      label="Sellers"
                      multiple
                      v-model="selectedUsers"
                      item-text="name"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
              <v-btn color="blue darken-1" text @click="update()"  > Save </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'updateProduct',

  data() {
    return {
  
      ////
      dialogeStatus: false,
      id: '',
      ProductName: '',
      nameVlaidate: [(v) => !!v || 'Name is required'],
      Price: '',
      image: '',
      selectedUsers: [],
      users: [
        {
          name: 'ahmad',
          id: '12',
        },
        {
          name: 'Khaled',
          id: '5',
        },
        {
          name: 'Waleed',
          id: '9',
        },
      ],
    }
  },

  methods: {
    ...mapMutations(['dialogemut']),
    ...mapActions(['addProduct', 'dialoge', 'updateProductfetch']),
    close() {
      this.dialogeStatus = !this.dialogeStatus
    },

    // onSubmit(product) {
    //     product.preventDefault()
    //   this.updateProductfetch(newProduct)
    //   if (this.ProductName.length > 0) this.close()
    // },

    update() {
    
      const updatedProduct = {
        name: this.ProductName,
        price: this.Price,
        image: this.image,
        users: this.selectedUsers,
        id: this.id,
        userid: this.product.users,
      }
      this.updateProductfetch(updatedProduct)
      if (this.ProductName.length > 0) this.close()
    },
  },
  props: {
    product: Object,
  },
  computed: {
    ...mapGetters({
      dialoges: 'openDialoge',
    }),
  },
  mounted() {
    try {
      this.selectedUsers = this.product.users.map((ele) => ele.user)
      this.ProductName = this.product.name
      this.Price = this.product.price
      this.image = this.product.image
      this.id = this.product.id
    } catch (error) {}
  },
}
</script>

<style lang="scss" scoped>
#updatebtn {
  margin-left: 30px;
  max-width: 200px;
}
</style>

// this.$router.push( // `/edit/${id}` // )
