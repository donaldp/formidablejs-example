<template>
  <div
    class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="w-auto h-12 mx-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Create a new Account
        </h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          Or
          {{ " " }}
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </router-link>
        </p>

        <template v-if="errors.length > 0">
          <p class="mt-4 text-sm text-left text-red-600"> Whoops, something went wrong!</p>
          <!-- create a list of errors -->
          <ul class="mt-2 ml-5 text-sm text-left text-red-600 list-disc">
            <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
          </ul>
        </template>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-1 rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Name</label>
            <input
              type="text"
              autocomplete="name"
              required=""
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              v-model="form.name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              type="email"
              autocomplete="email"
              required=""
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="form.email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              type="password"
              autocomplete="current-password"
              required=""
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="form.password"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password Confirmation</label>
            <input
              type="password"
              autocomplete="current-password"
              required=""
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password Confirmation"
              v-model="form.password_confirmation"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import user from '../../api/user'
import formErrors from '../../api/errors'

export default {
  data() {
    return {
      errors: [],
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    }
  },
  methods: {
    async onSubmit() {
      this.errors = []

      user.register(this.form, (response, error) => {
        if (error && error.response) {
          return this.errors = formErrors(error)
        }

        window.location.href = '/';
      })
    }
  }
};
</script>