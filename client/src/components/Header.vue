<template>
  <Popover class="relative bg-white">
    <div class="px-4 mx-auto max-w-7xl sm:px-6">
      <div
        class="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#" class="font-extrabold">
            todo.
          </a> 
          &nbsp;|
          <p class="mt-1 text-xs">&nbsp; Hello {{ user.name }}</p>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="w-6 h-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-gray-900' : 'text-gray-500',
                `group bg-white rounded-md inline-flex items-center text-sm font-medium
                sm:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500`,
              ]"
            >
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div
                    class="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8"
                  >
                    <a
                      v-for="item in solutions"
                      :key="item.name"
                      :href="item.href"
                      class="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                    >
                      <component
                        :is="item.icon"
                        class="flex-shrink-0 w-6 h-6 text-indigo-600"
                        aria-hidden="true"
                      />
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div
                    class="px-5 py-5 space-y-6 bg-gray-50 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8"
                  >
                    <div
                      v-for="item in callsToAction"
                      :key="item.name"
                      class="flow-root"
                    >
                      <a
                        :href="item.href"
                        class="flex items-center p-3 -m-3 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100"
                      >
                        <component
                          :is="item.icon"
                          class="flex-shrink-0 w-6 h-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="ml-3">{{ item.name }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </PopoverGroup>
        <div class="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
          <button
            @click="logout"
            class="flex text-sm font-medium text-gray-500 transition-colors whitespace-nowrap hover:text-gray-900"
          >
            logout <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <PopoverPanel
        focus
        class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
      >
        <div
          class="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50"
        >
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <img
                  class="w-auto h-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="w-6 h-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="px-5 py-6 space-y-6">
            <div>
              <a
                href="#"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  MenuIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import PrimaryButton from './elements/PrimaryButton.vue';
import user from '../api/user'

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    MenuIcon,
    XIcon,
    PrimaryButton,
    ChevronRightIcon,
  },

  data() {
    return {
      user: {}
    }
  },

  mounted() {
    this.getUser()
  },

  methods: {
    /**
     * Log the user out.
     *
     * @returns {void}
     */
    logout() {
      user.logout((success, error) => {
        if (error) {
          return window.location.reload();
        }

        window.location.href = '/login';
      })
    },

    /**
     * Fetch user from backend api.
     *
     * @returns {void}
     */
    async getUser() {
      const { data } = await user.get()

      this.user = data
    }
  }
};
</script>