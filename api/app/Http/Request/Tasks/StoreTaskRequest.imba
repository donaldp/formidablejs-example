import Task from '../../../Models/Task'
import { FormRequest } from '@formidablejs/framework'

export default class StoreTaskRequest < FormRequest

	def authorize
		true

	def rules
		{
			description: 'required|string|min:4|max:30',
		}

	def persist
		new Task({
			user_id: self.auth!.user!.id
			description: self.input('description')
		}).save!
