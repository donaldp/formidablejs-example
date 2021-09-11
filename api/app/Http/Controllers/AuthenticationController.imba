import { FormRequest } from '@formidablejs/framework'
import { without } from '@formidablejs/helpers'
import Controller from './Controller'

export default class AuthenticationController < Controller

	def index request\FormRequest
		{ status: 'success' }

	def user request\FormRequest
		without(request.auth!.user!, ['id', 'password'])
