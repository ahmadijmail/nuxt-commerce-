<template>
  <v-app>
    <div>
      <v-container v-for="pro in product">
        <div class="row">
          <div class="col-md-5 col-sm-5 col-xs-12">
       
          
                <v-img class="pic" :src="pro.image"></v-img>
            
      
          </div>
          <div class="col-md-7 col-sm-7 col-xs-12">
            <br/>
         
            <v-breadcrumbs class="title2" :items="breadcrums">{{
              pro.name
            }}</v-breadcrumbs>
            <div class="pl-6">
              <p class="display-1 mb-0"></p>
              <v-card-actions class="pa-0">
                <p class="headline font-weight-light pt-3">
                  {{ pro.price }}
                  <del style="" class="subtitle-1 font-weight-thin">2000</del>
                </p>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
     
                <span class="body-2 font-weight-thin"> 25 REVIEWS</span>
     
              </v-card-actions>
              <br/>
              <p class="subtitle-1 font-weight-thin">
                In any business environment, partnerships between organizations are common for lead referral sharing, co-sponsored marketing initiatives, and joint product or service distribution. Developing these relationships often starts by sending a business introduction email to request a conference call or meeting for further discussion.
            </p>
              <p class="title">ITEMS</p>
          <br/>
              <v-text-field
                outlined
                style="width: 100px"
                :value="1"
                dense
              ></v-text-field>
              <br/>
              <v-btn class="primary white--text" outlined tile dense
                ><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn
              >
              <v-btn class="ml-4" outlined tile>ADD TO WISHLIST</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-xs-12 col-md-12">
            <v-tabs>
              <v-tab>Description</v-tab>
              <v-tab>Materials</v-tab>
              <v-tab>REVIEWS</v-tab>
              <v-tab-item>
                <p class="pt-10 subtitle-1 font-weight-thin">
                  The Best device you will ever seen
                </p>
              </v-tab-item>
              <v-tab-item>
                <p class="pt-10 subtitle-1 font-weight-thin" id="">
                  comes with the box, charger and a GIFT.
                </p>
              </v-tab-item>
              <v-tab-item>
                <v-list three-line="true" avatar="true">
                  <v-list-item-group v-model="item" color="primary">
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      inactive="true"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="item.title"
                        ></v-list-item-title
                        ><v-rating
                          v-model="rating"
                          class=""
                          background-color="warning lighten-3"
                          color="warning"
                          dense
                        ></v-rating>
                        <v-list-item-subtitle
                          v-html="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-tab-item>
            </v-tabs>

            <div class="cards" tile outlined>
              <p class="subtitle-1 font-weight-light pt-3 text-center">
                YOU MIGHT ALSO LIKE
              </p>
              <v-divider></v-divider>
              <div>
                <v-row no-gutters max-w>
                  <v-card
                    @click="$router.push(`/product/${product.id}`)"
                    v-for="product in products"
                    class="card mx-auto my-12"
                  >
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-img class="pic" :src="product.image"></v-img>

                    <v-card-title class="prodname">{{
                      product.name
                    }}</v-card-title>
                    <v-card-title class="date"
                      >Date: {{ product.date }}</v-card-title
                    >
                    <v-card-title>Sellers</v-card-title>

                    <v-card-text>
                      <v-chip-group
                        v-model="selection"
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip v-for="user in product.users">{{
                          user.user.name
                        }}</v-chip>
                      </v-chip-group>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions>
                      <v-btn color="deep-purple lighten-2" text>
                        Price: {{ product.price }} $
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-row>

                <template v-if="addDialog">
                  <AddProduct :dialog="addDialog" @close="close" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </v-container>
      
    </div>
  </v-app>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: '',
      rating: 4.5,
      breadcrums: [
        {
          text: 'Home',
          disabled: false,
          href: 'breadcrumbs_home',
        },
        {
          text: 'Clothing',
          disabled: false,
          href: 'breadcrumbs_clothing',
        },
        {
          text: 'T-Shirts',
          disabled: true,
          href: 'breadcrumbs_shirts',
        },
      ],
      item: 5,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Lorem ipsum dolor?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; Best Product ever.\n" +
            '\n',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title:
            'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; very bad battery",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Lorem ipsum dolor',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Fast Shipping exellant man thank you",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Lorem ipsum dolor',
          subtitle: '',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Lorem ipsum dolor',
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; 10000%",
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      products: 'getProducts',
    }),
  },

  mounted() {
    this.product = this.products.filter((el) => el.id == this.id)
  },
}
</script>

<style lang="scss" scoped>
.card {
  margin: 50px;
  padding-left: 10px;
  max-width: 200px;
  min-width: 300px;
}
.pic {
  top: 20px;
  align-items: center;
  right: 5px;
  min-height: 300px;
}

.upp .button {
  max-width: 1000px;
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
  max-width: 10px;
}

.buttons {
  margin-left: 12%;
}
.title2{
  font-size:50px;
}
</style>
