<template>
  <button
    type="submit"
    class="login-button">
    <slot>Text</slot>
  </button>
</template>

<style scoped lang=scss>
.login-button {
  transition: all 0.3s;
  display: inline-block;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  color: white;
  text-decoration: none;
  padding: 10px 30px;
}

.login-button:hover {
  border-width: 1px;
  border-style: solid;
  background-color: white;
}
</style>
