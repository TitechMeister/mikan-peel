<template>
  <button
    type="submit"
    class="login-button">
    <slot>Text</slot>
  </button>
</template>

<style scoped lang=scss>
.login-button {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid white;
  background-color: #f08300;
  color: white;
  text-decoration: none;
  padding: 10px 30px;
}

.login-button:hover {
  border: 1px solid #f08300;
  background-color: white;
  color: #f08300;
}
</style>
