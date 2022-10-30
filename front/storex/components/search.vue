<template>
  <div>
    <template>
      <v-toolbar
        color="light-blue
"
      >
        <v-col cols="2" class="titless">StoreX</v-col>
        <v-col cols="6">
          <v-text-field
          v-model="words"
            hide-no-data
            hide-details
            label="What are you looking for?"
            solo-inverted
          >
          </v-text-field>
        </v-col>

        <v-col cols="2"></v-col>
        <v-col cols="3.5" class="calender">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Pick date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker range v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-btn icon @click="searchbutton">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SearchBar',

  data() {
    return {
        words: '',
      date: '',
      items: [],
      menu: '',
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    searchbutton() {
      console.log(this.words, 'dateeee')
      let searchdata = {
        dateFrom: this.date[0],
        dateTo: this.date[1],
        name: this.words,
      }
      this.fetchProducts(searchdata)
    },
  },
}
</script>

<style lang="scss" scoped>
.calender {
  margin-top: 20px;
}
.titless {
  font-size: xx-large;
}
</style>
