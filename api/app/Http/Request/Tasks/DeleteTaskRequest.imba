import Task from '../../../Models/Task'
import { FormRequest } from '@formidablejs/framework'

export default class DeleteTaskRequest < FormRequest

	def authorize
		true

	def rules
		{
			id: 'integer'
		}

	def persist
		task = await Task
			.where('id', self.input('id'))
			.where('user_id', self.auth!.user!.id)
			.fetch!

		if !task then throw new NotFoundException 'Task not found.'

		task.destroy!
