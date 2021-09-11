import { AuthService as Auth, ServiceResolver, Route } from '@formidablejs/framework'

export default class RouterServiceResolver < ServiceResolver

	def boot
		Route.group { middleware: ['session'] }, do
			Auth.routes!

			Route.group { middleware: ['auth'] }, do
				require '../../routes/api'

		self
