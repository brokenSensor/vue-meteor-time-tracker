import Vuex from 'vuex'

const store = new Vuex.Store({
	state: {
		taskList: [],
	},
	mutations: {
		setTaskList(state, payload) {
			state.taskList = payload
		},
	},
	actions: {
		loadTaskList(context) {
			const taskList = JSON.parse(localStorage.getItem('taskList'))
			context.commit('setTaskList', taskList)
		},
	},
})

export default store
