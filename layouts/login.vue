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
  position: fixed;
  overflow-y: scroll;
  width: 100vw;
  max-height: 100%;
  height: 100vh;
  background-color: #f08300;
  display: flex;
  justify-content: center;

  > * {
    margin: 20px;
  }
}
</style>
