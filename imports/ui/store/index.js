import Vuex from 'vuex'

// const task = {
// 	title: String,
// 	description: String,
// 	timer: 'number of seconds',
// 	completed: boolean,
// 	current: boolean,
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
			return state.taskList.filter((task) => task.completed)
		},
		getUncompletedTasks(state) {
			return state.taskList.filter((task) => !task.completed)
		},
		getCurrentTask(state) {
			return state.taskList[state.currentTask.index]
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
		setActiveTask(state, { index }) {
			const task = state.taskList[index]

			state.currentTask = {
				index,
				activeTaskTimer: task.timer,
				isTimerActive: false,
			}

			state.taskList[index].current = true
		},
		toggleCompletionTask(state) {
			state.taskList[state.currentTask.index].completed =
				!state.taskList[state.currentTask.index].completed
		},
		addTask(state, { title, description }) {
			state.taskList.push({
				title,
				description,
				timer: 0,
				completed: false,
				current: false,
			})
		},
		removeTask(state, { index }) {
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
			state = {
				taskList: taskState.taskList,
				currentTask: taskState.currentTask,
			}
		},
		saveState(state) {
			const taskState = JSON.stringify(state)
			localStorage.setItem('taskState', taskState)
		},
	},
	actions: {},
})

export default store
