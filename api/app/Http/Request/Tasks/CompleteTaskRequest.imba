import Task from '../../../Models/Task'
import { NotFoundException, FormRequest } from '@formidablejs/framework'
import now from '@formidablejs/framework/lib/Support/Helpers/now'

export default class CompleteTaskRequest < FormRequest

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

		if !task then throw new NotFoundException 'Task not found'

		await task.set('completed_at', now!).save!
