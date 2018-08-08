<template>
  <div id="login">
    <LogoBig></LogoBig>
    <b-form
      id="form"
      @submit="onSubmit"
      v-if="show">
      <b-form-group
        id="field-username"
        label="Username"
        label-for="input1">
        <FormInput
          id="input1"
          :state="!loginError"
          v-model.trim="form.username" />
      </b-form-group>
      <b-form-group
        id="user-password"
        label="Password"
        label-for="input2">
        <FormInput
          id="input2"
          type="password"
          :state="!loginError"
          v-model.trim="form.password" />
      </b-form-group>
      <ButtonOutlineMikan
        id="login-button"
        type="submit">Login</ButtonOutlineMikan>
    </b-form>
    <transition name="fade">
    <div id="login-error-message"
         v-if="loginError">
      Login failed.
    </div>
    </transition>
    <div id="link-wrapper">
      <router-link
        id="register-link"
        to="register">Register</router-link>
      <router-link
        id="recover-link"
        to="recover">Forgot password?</router-link>
    </div>
  </div>
</template>

<script>
import * as api from '../utils/mikan-api'
import Cookies from 'js-cookie';
import ButtonOutlineMikan from '~/components/ButtonOutlineMikan'
import LogoBig from '~/components/LogoBig'
import FormInput from '~/components/FormInput.vue'

export default {
  components: {
    ButtonOutlineMikan,
    LogoBig,
    FormInput
  },
  computed: { },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loginError: false,
      show: true
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      try {
        await this.$store.dispatch("fetchToken", this.form)
      }
      catch (e) {
        this.loginError = true
        return
      }
      this.loginError = false
      if (Cookies.get('redirect')) {
        const redirect = Cookies.get('redirect')
        location.href = redirect;
        return
      }
      await this.$store.dispatch("fetch")
      this.$router.push('/')
    },
  },
  middleware: ['noAuth'],
  layout: 'login'
}
</script>

<style scoped lang=scss>
input, textarea {
  background-color: #f08300 !important;
  border: 1px solid white !important;
  color: white !important;
}
#login {
  width: 600px;
  text-align: center;
  color: white;


  #login-button {
    margin: 20px;
  }

  #link-wrapper {
    display: flex;
    flex-direction: column;
    * {
      margin: 5px;
      color: white;
    }
  }

  #login-error-message {
    margin-bottom: 20px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
