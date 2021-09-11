import { Model } from '@formidablejs/framework'

export default class Task < Model

	get tableName
		'tasks'

	# The attributes that should be hidden.
	#
	# @type {string[]}

	get hidden
		[
			'user_id'
		]
