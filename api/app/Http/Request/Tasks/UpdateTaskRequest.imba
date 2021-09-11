import Task from '../../../Models/Task'
import { NotFoundException, FormRequest } from '@formidablejs/framework'

export default class UpdateTaskRequest < FormRequest

	def authorize
		true

	def rules
		{
			id: 'required|integer'
			description: 'required|string|min:4|max:30'
		}

	def persist
		task = await Task
			.where('id', self.input('id'))
			.where('user_id', self.auth!.user!.id)
			.fetch!

		if !task then throw new NotFoundException 'Task not found.'

		await task.set('description', self.input('description')).save!
