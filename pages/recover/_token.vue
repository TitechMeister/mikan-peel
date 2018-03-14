<template>
  <div id="register">
    <div class="logo-container">
      <img src="/Mikan-logo-white.png" />
      <h1>Mikan</h1>
    </div>
    <div v-if="show">
      <h2 v-if="form.token">Enter new password</h2>
      <h2 v-else>{{ invalidTokenMessage }}</h2>
    </div>
    <b-form
      id="form"
      @submit="onSubmit"
      v-if="show && form.token">
      <b-form-group horizontal
                    id="field-password"
                    label="パスワード"
                    label-for="form-password">
        <b-form inline
                id="forms-password">
          <b-form-input id="form-password"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :state="!status_message.password"
                        type="password"
                        v-model.trim="form.password" />
          <b-form-input id="form-password-confirm"
                        class="mr-sm-2 mb-sm-0"
                        :state="passwordConfirm === form.password"
                        type="password"
                        placeholder="再入力"
                        v-model.trim="passwordConfirm" />
        </b-form>
        <transition name="fade">
          <div id="password-feedback"
               class="invalid-feedback-inline-form"
               v-if="status_message_password">
            {{ status_message_password }}
          </div>
        </transition>
      </b-form-group>
      <div id="register-button-wrapper">
        <ButtonOutlineMikan id="register-button"
                            type="submit">
          Submit
        </ButtonOutlineMikan>
        <transition name="fade">
          <div id="registration-message-success"
               class="registration-message"
               v-if="recoverSuccess">
            Successfully renewed password.<br/>
            Redirect to login page in 5s...
          </div>
          <div id="registration-message-process"
               class="registration-message"
               v-if="recoverProcess">
            Renewing password...<br/>
          </div>
          <div id="registration-message-error"
               class="registration-message"
               v-if="recoverError">
            Please correct errors.
          </div>
        </transition>
      </div>
    </b-form>
  </div>
</template>

<script>
import * as api from '~/utils/mikan-api'
import Cookies from 'js-cookie';
import ButtonOutlineMikan from '~/components/ButtonOutlineMikan'

export default {
  components: {
    ButtonOutlineMikan
  },
  data () {
    return {
      form: {
        password: '',
        token: null
      },
      status_message: {
        password: null,
      },
      passwordConfirm: '',
      recoverSuccess: false,
      recoverProcess: false,
      recoverError: false,
      invalidTokenMessage: 'Invalid token.',
      show: false
    }
  },
  computed: {
    passwordMatch () {
      return this.form.password === this.passwordConfirm
    },
    status_message_password () {
      const passwordNoMatchMessage = this.passwordMatch ? null : 'Password did not match.'
      const passwordStatusMessage = this.status_message.password
      if (this.passwordMatch && !passwordStatusMessage) {
        return null
      }
      else if (!this.passwordMatch && passwordStatusMessage) {
        return [passwordNoMatchMessage, passwordStatusMessage].join("\n")
      }
      else {
        return passwordNoMatchMessage || passwordStatusMessage
      }
    },
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      if (this.recoverSuccess || this.recoverProcess) {
        return
      }

      if (!this.passwordMatch) {
        this.recoverError = true
        return
      }

      this.recoverSuccess = false
      this.recoverError = false
      this.recoverProcess = true

      try {
        await api.postWithoutDefaultHeader("/recover/renew/", this.form)
      } catch (e) {
        if (!e.response) return
        for (let key in this.status_message) {
          this.status_message[key] = null
        }
        for (let key in e.response.data) {
          this.status_message[key] = e.response.data[key].join("\n")
        }
        this.recoverError = true
        this.recoverProcess = false
        return
      }

      this.recoverProcess = false
      this.recoverSuccess = true

      setTimeout(() => {
        this.$router.push('/login')
      }, 5000)
    },
  },
  async mounted () {
    let token = this.$route.params.token
    try {
      await api.postWithoutDefaultHeader("/recover/verify/", {token})
      this.form.token = token
    } catch (e) {
      this.form.token = null
      this.invalidTokenMessage = e.response.data.token.join()
    }
    this.show = true
  },
  middleware: 'noAuth',
  layout: 'login'
}
</script>

<style lang=scss>
#register {
  width: 600px;
  color: white;
  overflow: scroll;

  .logo-container {
    margin-bottom: 20px;
    display: flex;
    img {
      justify-content: center;
      height: 4rem;
      width: auto;
      margin-right: 20px;
    }
    h1 {
      font-size: 3.5rem;
      font-family: 'Quicksand', 'Avenir', Helvetica, Arial, sans-serif;
    }
  }
  h2, h3 {
    font-size: 1.5rem;
    font-weight: 300;
    padding-left: 5px;
  }
  .b-form-group {
    margin: 15px 5px;
  }
  input, textarea, field-profile-image * {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }
  .invalid-feedback {
    color: white;
  }
  .invalid-feedback-inline-form {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: white;
  }
  ::placeholder {
    color: white;
    opacity: 0.5;
  }
  .custom-file-input~.custom-file-label {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }
  .custom-file-input~.custom-file-label::after {
    content: none;
  }
  .custom-select {
    background-color: #f08300;
    border: 1px solid white;
    color: white;
  }
  #register-button-wrapper {
    display: flex;
    align-items: center;

    #register-button {
      margin: 20px;
    }
    #register-message {
      margin: 30px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
