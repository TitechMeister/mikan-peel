<template>
  <div>
    <LogoBig></LogoBig>
    <p>
      Sorry, this page is under construction.
    </p>
    <LinksErrorPage></LinksErrorPage>
  </div>
</template>

<script>
import LogoBig from '~/components/LogoBig'
import LinksErrorPage from '~/components/LinksErrorPage'

export default {
  components: {
    LogoBig,
    LinksErrorPage,
  },
  layout: 'login'
}
</script>

<style scoped>
p{
  color: white;
}
</style>
