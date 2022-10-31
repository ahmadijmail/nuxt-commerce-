<template>
  <div>
    <v-app>
      <NavBar class="nav"/>
    </v-app>
    <Nuxt />
  </div>
</template>

<script>
import NavBar from '../components/navBar.vue'
import indexVue from '../pages/index.vue'

export default {
  components: {
    NavBar,
  },
}
</script>

<style lang="scss" scoped>
.nav{
    margin-bottom: 0;
    min-height: 0;
}
</style>
