<template>
  <div></div>
</template>

<script>
export default {
  async created () {
    await this.$store.dispatch('logout')
    this.$router.push('/login')
  },
  middleware: ["auth"],
  layout: "login"
}
</script>
