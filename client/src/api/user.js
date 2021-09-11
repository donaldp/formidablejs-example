import api, { post } from './api'
import csrf from './csrf'

export default class User {
  /**
   * Check if the user is logged in or not.
   *
   * @returns {Promise<Boolean>}
   */
  static async isAuthenticated () {
    try {
      await api.get('/auth')
      return true
    } catch {
      return false
    }
  }

  /**
   * Get the current user.
   *
   * @returns {Promise<Object>}
   */
  static async get() {
    return await api.get('/auth/user')
  }

  /**
   * Log the user in.
   *
   * @param {Object} data login data
   * @param {Function} callback 
   */
  static async login(data, callback) {
    await post('/login', data, callback)
  }

  /**
   * Create a new user.
   *
   * @param {Object} data
   * @param {Function} callback 
   */
  static async register(data, callback) {
    await post('/register', data, callback)
  }

  /**
   * Log the user out.
   *
   * @param {Function} callback 
   */
  static async logout(callback) {
    await post('/logout', {}, callback)
  }
}

