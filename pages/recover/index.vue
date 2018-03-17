<template>
  <div id="register">
    <LogoMedium></LogoMedium>
    <h2>Recover password</h2>
    <b-form
      id="form"
      @submit="onSubmit"
      v-if="show">
      <b-form-group horizontal
                    id="field-email"
                    label="メール"
                    label-for="form-email">
        <b-form-input id="form-email"
                      :state="!status_message.email"
                      placeholder="example@meister.tech"
                      v-model.trim="form.email" />
        <transition name="fade">
          <b-form-invalid-feedback id="email-feedback"
                                   v-if="status_message.email">
            {{ status_message.email }}
          </b-form-invalid-feedback>
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
            Email was sent. Please follow steps on the mail.<br/>
          </div>
          <div id="registration-message-process"
               class="registration-message"
               v-if="recoverProcess">
            Requesting password renewal...<br/>
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
import LogoMedium from '~/components/LogoMedium'

export default {
  components: {
    ButtonOutlineMikan,
    LogoMedium
  },
  data () {
    return {
      form: {
        email: '',
      },
      status_message: {
        email: null,
      },
      recoverSuccess: false,
      recoverProcess: false,
      recoverError: false,
      show: true
    }
  },
  computed: {
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      if (this.recoverSuccess || this.recoverProcess) {
        return
      }

      this.recoverSuccess = false
      this.recoverError = false
      this.recoverProcess = true

      try {
        await api.postWithoutDefaultHeader("/recover/token/", this.form)
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
  middleware: 'noAuth',
  layout: 'login'
}
</script>

<style lang=scss>
#register {
  width: 600px;
  color: white;
  overflow: scroll;

  h2 {
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
