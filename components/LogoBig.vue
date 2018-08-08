<template lang="pug">
  #logo-wrapper
    #logo
      img(:src="imgSrc")
    h1(:class="textClass") Mikan
</template>

<script>
export default {
  props: {
    colored: false
  },
  computed: {
    imgSrc () {
      return this.colored ? '/Mikan-logo-orange.png' :'/Mikan-logo-white.png' 
    },
    textClass () {
      return this.colored ? 'textOrange' : 'textWhite'
    },
  }
}
</script>

<style scoped lang=scss>
@import "../assets/styles/colors.scss";
@import "../assets/styles/ui.scss";

.textOrange {
  color: $mikan;
}
.textWhite {
  color: white;
}
#logo-wrapper {
  text-align: center;

  #logo {
    height: 200px;
    max-height: 30vh;
    text-align: center;
    img {
      height: 100%;
      width: auto;
    }
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-family: 'Quicksand', 'Avenir', Helvetica, Arial, sans-serif;
  }
}
</style>
