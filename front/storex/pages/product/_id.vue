<template>
  <div>
    {{ this.$route.params.id }}
  </div>
</template>

<script>
export default {
  head() {
    return {}
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
}
article * {
  margin-bottom: 1rem;
}
aside {
  min-width: 280px;
  max-width: 280px;
  padding-left: 2rem;
}
.title {
  font-size: 2rem;
}
</style>
