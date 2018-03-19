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
      return JSON.parse(process.env.ERROR_LINKS)
    }
  }
}
</script>

<style scoped lang="scss">
#error-link-wrapper {
  text-align: center;
  flex-direction: row;

  div {
    margin: 10px;
    a {
      color: white;
    }
  }
}
</style>
