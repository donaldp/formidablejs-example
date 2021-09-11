<template>
  <div
    :class="{
      'text-gray-500' : working
    }"
  >
    <AppHeader/>

    <!-- centered tailwind -->
    <div class="container px-4 mx-auto">
      <div class="flex flex-wrap justify-center">
        <div class="w-full max-w-md">
          <form @submit.prevent="onSubmit" method="POST">
            <div class="flex flex-wrap justify-between my-6">
              <input
                v-model="description"
                class="w-5/6 px-4 py-4 text-sm font-medium placeholder-gray-500 border border-gray-200 rounded-lg shadow focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Task description.."
              />

              <button
                class="flex items-center justify-center w-12 text-gray-600 transition-colors hover:text-gray-900"
              >
                <span>add</span>
                <PlusIcon class="w-5 h-5"/>
              </button>
            </div>

            <!-- display errors -->
            <div class="my-4 text-xs text-red-500" v-if="errors.length">
              <ul class="list-disc list-inside">
                <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
              </ul>
            </div>

          </form>

          <hr>

          <div class="text-center text-gray-500" v-if="tasks.length === 0">
            <h1 class="mt-3 text-2xl font-semibold">
              <span class="text-gray-500">
                You have no tasks
              </span>
            </h1>
          </div>

          <li
            v-for="task in tasks"
            :key="task.id"
            class="flex items-center justify-between p-4 my-5 bg-white rounded-lg shadow "
          >
            <p v-if="editing.id !== task.id" :class="{
              'line-through italic text-gray-500': task.completed_at
            }">
              {{ task.description }}
            </p>

            <input
              v-if="task.id === editing.id"
              v-model="editing.description"
              class="w-5/6 border-b border-gray-400 focus:outline-none"
              type="text"
            />

            <div class="flex">
              <templete v-if="task.id === editing.id">
                <button
                  v-if="!task.completed_at"
                  aria-label="Edit task"
                  title="Edit task"
                  class="p-1 text-teal-500 transition-colors focus:outline-none focus:shadow-outline hover:text-teal-600"
                  @click="onDiscard(task)"
                >
                  <BanIcon class="w-6 h-6" />
                </button>
                <button
                  v-if="!task.completed_at"
                  aria-label="Edit task"
                  title="Edit task"
                  class="p-1 text-teal-500 transition-colors focus:outline-none focus:shadow-outline hover:text-teal-600"
                  @click="onUpdate(task)"
                >
                  <SaveIcon class="w-6 h-6" />
                </button>
              </templete>

              <template v-if="task.id !== editing.id">
                <button
                  v-if="!task.completed_at"
                  aria-label="Edit task"
                  title="Edit task"
                  class="p-1 text-teal-500 transition-colors focus:outline-none focus:shadow-outline hover:text-teal-600"
                  @click="onEdit(task)"
                >
                  <PencilIcon class="w-6 h-6" />
                </button>

                <button
                  v-if="task.completed_at"
                  aria-label="Delete task"
                  title="Delete task"
                  class="p-1 text-red-500 transition-colors focus:outline-none focus:shadow-outline hover:text-red-600"
                  @click="onDelete(task)"
                >
                  <TrashIcon class="w-6 h-6" />
                </button>

                <button
                  v-if="!task.completed_at"
                  aria-label="Complete task"
                  title="Complete task"
                  class="p-1 text-green-500 transition-colors focus:outline-none focus:shadow-outline hover:text-red-600"
                  @click="onComplete(task)"
                >
                  <CheckIcon class="w-6 h-6"/>
                </button>
              </template>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { CheckIcon, PencilIcon, PlusIcon, SaveIcon, TrashIcon, BanIcon } from '@heroicons/vue/solid'
import api, { post, put } from '../api/api' 
import AppHeader from '@/components/Header.vue'
import formErrors from '../api/errors'


export default {
  name: 'Home',
  components: {
    AppHeader,
    PencilIcon,
    CheckIcon,
    PlusIcon,
    TrashIcon,
    SaveIcon,
    BanIcon,
  },
  data() {
    return {
      errors: [],
      editing: {},
      description: '',
      working: false,
      tasks: []
    };
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    /**
     * Create new task.
     *
     * @returns {void}
     */
    onSubmit() {
      if (!this.description) return

      this.errors = []
      this.working = true

      put('/tasks', { description: this.description }, (response, error) => {
        this.working = false

        if (error && error.response) {
          return this.errors = formErrors(error)
        }

        if (error) {
          alert('Oops, something went wrong')

          return
        }

        this.description = ''

        this.tasks.unshift(response.data)
      });
    },

    /**
     * Start editing task.
     *
     * @param {Object} task
     * @returns {void}
     */
    onEdit(task) {
      this.editing.id = task.id
      this.editing.description = task.description
    },

    /**
     * Update task.
     *
     * @param {Object} task
     * @returns {void}
     */
    onUpdate(task) {
      this.working = true

      post('/tasks/update', this.editing, (response, error) => {
        this.working = false

        if (error && error.response) return alert(formErrors(error))

        if (error) return alert('Oops, something went wrong')

        this.tasks = this.tasks.map((t) => {
          return t.id === response.data.id ? response.data : t
        })

        this.editing = {}
      })
    },

    /**
     * Discard changes.
     *
     * @param {Object} task
     * @returns {void}
     */
    onDiscard(task) {
      this.editing = {}
    },

    /**
     * Mark task as completed.
     *
     * @param {Object} task
     * @returns {void}
     */
    onComplete(task) {
      this.working = true

      post('/tasks/complete', task, (response, error) => {
        this.working = false

        if (error && error.response) return alert('Could not mark task as complete')

        if (error) return alert('Oops, something went wrong')

        this.tasks = this.tasks.map((t) => {
          return t.id === response.data.id ? response.data : t
        })
      })
    },

    /**
     * Delete task.
     *
     * @param {Object} task
     * @returns {void}
     */
    onDelete(task) {
      this.working = true

      post('/tasks', task, (response, error) => {
        this.working = false

        if (error && error.response) return alert('Could not delete task')

        if (error) return alert('Oops, something went wrong')

        this.tasks = this.tasks.filter(t => t.id !== task.id)
      });
    },

    /**
     * Get tasks.
     *
     * @returns {void}
     */
    getTasks() {
      this.working = true

      api.get('/tasks').then((response) => {
        this.working = false

        this.tasks = response.data
      })
    }
  }
}
</script>
