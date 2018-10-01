<template lang="pug">
  LogoBig
</template>

<script>
import LogoBig from '~/components/LogoBig'

export default {
  components: {
    LogoBig
  },
  middleware: ['auth']
}
</script>

<style lang="scss">
#wrapper > * {
  margin: 20px;
}
</style>
