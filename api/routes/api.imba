import { Route } from '@formidablejs/framework'
import AuthenticationController from '../app/Http/Controllers/AuthenticationController'
import TaskController from '../app/Http/Controllers/TaskController'

# auth routes
Route.group { prefix: 'auth' }, do
	Route.get('/', [AuthenticationController, 'index'])
	Route.get('/user', [AuthenticationController, 'user'])

# task routes
Route.group { prefix: 'tasks' }, do
	Route.get('/', [TaskController, 'all']).name('tasks.all')
	Route.put('/', [TaskController, 'store']).name('tasks.store')
	Route.post('/', [TaskController, 'remove']).name('tasks.remove')
	Route.post('complete', [TaskController, 'complete']).name('tasks.complete')
	Route.post('update', [TaskController, 'update']).name('tasks.update')
