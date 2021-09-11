import UpdateTaskRequest from '../Request/Tasks/UpdateTaskRequest'
import DeleteTaskRequest from '../Request/Tasks/DeleteTaskRequest'
import { @use } from '@formidablejs/framework'
import CompleteTaskRequest from '../Request/Tasks/CompleteTaskRequest'
import Controller from './Controller'
import GetAllTasksRequest from '../Request/Tasks/GetAllTasksRequest'
import StoreTaskRequest from '../Request/Tasks/StoreTaskRequest'

export default class TaskController < Controller

	@use(GetAllTasksRequest)
	def all request\GetAllTasksRequest
		request.persist!

	@use(DeleteTaskRequest)
	def remove request\DeleteTaskRequest
		request.persist!

	@use(StoreTaskRequest)
	def store request\StoreTaskRequest
		request.persist!

	@use(CompleteTaskRequest)
	def complete request\CompleteTaskRequest
		request.persist!

	@use(UpdateTaskRequest)
	def update request\UpdateTaskRequest
		request.persist!
