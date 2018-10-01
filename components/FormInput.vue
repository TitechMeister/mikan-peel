<template lang="pug">
  .form-wrapper
    input(:class="inputClass"
          :value="value"
          :placeholder="placeholder"
          :type="isPassword ? 'password' : ''"
          @input="$emit('input', $event.target.value)")
    transition(name="fade")
      .validation-message(v-if="!state && message")
        small {{ message }}
</template>

<script>
export default {
  props: {
    value: '',
    placeholder: '',
    state: true,
    message: null,
    isPassword: false
  },
  computed: {
    inputClass () {
      return this.state ? 'inputValid' : 'inputInvalid'
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/colors.scss";
@import "../assets/styles/ui.scss";
input
  @include form-element
.inputValid:focus
  @include form-element--focus($valid)
.inputInvalid:focus
  @include form-element--focus($invalid)
</style>
