<template>
  <div id="login-container">
    <nuxt/>
  </div>
</template>

<script>
export default { }
</script>

<style lang=scss>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

#login-container {
  width: 100vw;
  height: 100vh;
  background-color: #f08300;
  display: flex;
  justify-content: center;

  > * {
    margin: 20px;
  }
}
</style>
