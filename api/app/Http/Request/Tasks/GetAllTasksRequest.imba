import Task from '../../../Models/Task'
import { FormRequest } from '@formidablejs/framework'

export default class GetAllTasksRequest < FormRequest

	def authorize
		true

	def rules
		{

		}

	def persist
		Task
			.where('user_id', self.auth!.user!.id)
			.fetchAll!
