<template>
  <div>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Cart',
  methods: {
    ...mapActions(['fetchCart']),

  },

  computed: {
    ...mapGetters({
      cartItems: 'getCart',
    }),
  },

  created() {
    this.fetchCart()
  },
}
</script>

<style lang="scss" scoped>



</style>
