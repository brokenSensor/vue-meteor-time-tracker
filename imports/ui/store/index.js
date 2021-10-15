import Vuex from 'vuex'
import { v4 } from 'uuid'

// const task = {
//	id: 'uuid'
// 	title: String,
// 	description: String,
// 	timer: 'number of seconds',
// 	completed: boolean,
// 	current: boolean,
// createdAt: DAte,
// completedAt: Date
// }

const store = new Vuex.Store({
	state: {
		taskList: [],
		currentTask: {
			index: -1,
			activeTaskTimer: 0,
			isTimerActive: false,
		},
	},
	getters: {
		getAllTasks(state) {
			return state.taskList
		},
		getCompletedTasks(state) {
			return state.taskList
				.filter((task) => task.completed && !task.current)
				.sort((a, b) => b.completedAt - a.completedAt)
		},
		getUncompletedTasks(state) {
			return state.taskList
				.filter((task) => !task.completed && !task.current)
				.sort((a, b) => a.createdAt - b.createdAt)
		},
		getCurrentTask(state) {
			return {
				...state.taskList[state.currentTask.index],
				...state.currentTask,
			}
		},
	},
	mutations: {
		timerTick(state) {
			state.currentTask.activeTaskTimer = state.currentTask.activeTaskTimer + 1
			state.taskList[state.currentTask.index].timer =
				state.currentTask.activeTaskTimer
		},
		toggleTimer(state) {
			state.currentTask.isTimerActive = !state.currentTask.isTimerActive
		},
		setActiveTask(state, { id }) {
			const index = state.taskList.findIndex((task) => task.id === id)
			const task = state.taskList[index]

			state.currentTask = {
				index,
				activeTaskTimer: task.timer,
				isTimerActive: false,
			}

			state.taskList[index].current = true
		},
		removeActiveTask(state) {
			if (state.currentTask.index > -1) {
				state.taskList[state.currentTask.index].current = false
			}

			state.currentTask = {
				index: -1,
				activeTaskTimer: 0,
				isTimerActive: false,
			}
		},
		toggleCompletionTask(state) {
			state.taskList[state.currentTask.index].completed =
				!state.taskList[state.currentTask.index].completed
			if (state.taskList[state.currentTask.index].completed) {
				state.taskList[state.currentTask.index].completedAt = Date.now()
			} else {
				state.taskList[state.currentTask.index].completedAt = null
			}
		},
		addTask(state, { title, description }) {
			state.taskList.push({
				id: v4(),
				title,
				description,
				timer: 0,
				completed: false,
				current: false,
				createdAt: Date.now(),
				completedAt: null,
			})
		},
		deleteTask(state, { index }) {
			const task = state.taskList[index]
			if (task.current) {
				state.currentTask = {
					index: -1,
					activeTaskTimer: 0,
					isTimerActive: false,
				}
			}
			state.taskList.splice(index, 1)
		},
		loadState(state) {
			const taskState = JSON.parse(localStorage.getItem('taskState'))

			state.taskList = taskState.taskList
			state.currentTask = taskState.currentTask
		},
		saveState(state) {
			const taskState = JSON.stringify(state)
			localStorage.setItem('taskState', taskState)
		},
	},
	actions: {},
})

export default store
