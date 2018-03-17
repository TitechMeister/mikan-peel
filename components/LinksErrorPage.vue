<template>
  <div id="error-link-wrapper">
    <div v-for="key in Object.keys(links)"
         :key="key">
      <a :href="links[key]">{{ key }}</a>
    </div>
  </div>
</template>

<script>
export default {
  computed : {
    links () {
      console.log(process.env.ERROR_LINKS)
      return JSON.parse(process.env.ERROR_LINKS)
    }
  }
}
</script>

<style scoped lang="scss">
#error-link-wrapper {
  text-align: center;
  flex-direction: row;

  a {
    margin: 20px;
    color: white;
  }
}
</style>
