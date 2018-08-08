<template lang="pug">
  #wrapper
    LogoBig(:colored="true")
    #wrapper-button
      div(v-for="key in Object.keys(links)" :key="key")
        a(:href="links[key]")
          ButtonOutlineMikanInversed {{ key }}
</template>

<script>
import LogoBig from '~/components/LogoBig'
import ButtonOutlineMikanInversed from '~/components/ButtonOutlineMikanInversed.vue'

export default {
  components: {
    LogoBig,
    ButtonOutlineMikanInversed
  },
  // should be in global store
  computed : {
    links () {
      return JSON.parse(process.env.ERROR_LINKS)
    }
  },
  middleware: ['auth']
}
</script>

<style scoped lang="sass">
#wrapper
  margin-top: 2rem
  display: flex
  flex-direction: column
  align-items: center

#wrapper-button
  display: flex
  flex-direction: row
  > *
    margin: 0px 0.5rem
</style>
