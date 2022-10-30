<template>
  <div data-app>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }"> </template>
        <v-card>
          <v-form ref="dialogess" @submit="onSubmit" validate>
            <v-card-title>
              <span class="text-h5">Add Product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Product Name*"
                      :rules="nameVlaidate"
                      v-model="ProductName"
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
              <v-btn color="blue darken-1" text type="submit"> Save </v-btn>
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
  name: 'addProduct',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {

      ///
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

    ...mapActions(['addProduct']),
    close(data) {
      // this.dialogemut()
      this.$emit('close')
      // this.$refs.dialogess.reset()
    },

    onSubmit(e) {
      e.preventDefault()
      const newProduct = {
        name: this.ProductName,
        price: this.Price,
        image: this.image,
        users: this.selectedUsers,
      }
      this.addProduct(newProduct)
      if (this.ProductName.length > 0) this.close()
    },
  },

  computed: {
    // ...mapGetters({
    //   dialog: 'openDialoge',
    // }),
  },
}
</script>

<style lang="scss" scoped></style>

// this.$router.push( // `/edit/${id}` // )
