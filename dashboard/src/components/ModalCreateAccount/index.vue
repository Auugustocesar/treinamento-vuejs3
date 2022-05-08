<template>
  <div class="flex justify-between" id="modal-create-account">
    <h1 class="text-4xl font-black text-gray-800">
      Crie uma conta
    </h1>
    <button class="text-4xl text-gray-600 focus:outline-none"
            @click="close">
      &times;
    </button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">

      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input type="text"
               v-model="state.name.value"
               :class="{
                 'border-brand-danger': !!state.name.errorMessage,
                 'border-transparent': !state.name.errorMessage
               }"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded"
               placeholder="Jone Doe">
        <span class="block font-medium text-brand-danger"
              v-if="!!state.name.errorMessage">
          {{ state.name.errorMessage }}</span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input type="email"
               v-model="state.email.value"
               :class="{
                 'border-brand-danger': !!state.email.errorMessage,
                 'border-transparent': !state.email.errorMessage
               }"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded"
               placeholder="email@email.com">
        <span class="block font-medium text-brand-danger"
              v-if="!!state.email.errorMessage">
          {{ state.email.errorMessage }}</span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input type="password"
               v-model="state.password.value"
               :class="{
                 'border-brand-danger': !!state.password.errorMessage,
                 'border-transparent': !state.password.errorMessage
               }"
               class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded"
               placeholder="Senha">
        <span class="block font-medium text-brand-danger"
              v-if="!!state.password.errorMessage">
          {{ state.password.errorMessage }}</span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
        'opacity-50': state.isLoading
      }"
        class=" px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Criar conta</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '@/hooks/useModal'
import Icon from '@/components/Icon'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '@/utils/validators'
import services from '@/services'

export default {
  components: {
    Icon
  },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function login ({
      email,
      password
    }) {
      const {
        data,
        errors
      } = await services.auth.login({
        email,
        password
      })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }

      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const {
          errors
        } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar sua conta.')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        toast.error('Ocorreu um erro ao criar suua conta.')
        state.hasErrors = !!error
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
