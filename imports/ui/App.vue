<template>
	<b-container fluid="md" class="app">
		<b-row class="w-50">
			<b-col class="form">
				<b-input
					class="form__input"
					placeholder="Enter title"
					v-model="title"
				/>
				<b-input
					class="form__input"
					placeholder="Enter description"
					v-model="description"
				/>
				<b-btn class="form__btn w-100 mb-3" @click="addTask"
					><i class="fas fa-plus-circle"></i
				></b-btn>
			</b-col>
		</b-row>
		<b-row class="w-50" cols="1" v-if="currentTask.index > -1">
			<b-col>
				<h6 class="text-center m-3">Current Tasks</h6>
				<b-card
					:title="currentTask.title"
					header-tag="header"
					footer-tag="footer"
				>
					<template #header>
						<div class="task__header">
							<h6 class="text-center m-3">{{ formatedTimer }}</h6>
							<b-btn v-if="!timer" @click="startTimer"
								><i class="fas fa-play"></i
							></b-btn>
							<b-btn v-else @click="stopTimer"
								><i class="fas fa-pause"></i
							></b-btn>
						</div>
					</template>
					<b-card-text>
						{{ currentTask.description }}
					</b-card-text>
					<template #footer>
						<div class="task__footer">
							<b-btn @click="toggleCompletionTask">
								<i v-if="!currentTask.completed" class="fas fa-check"></i>
								<i v-else class="fas fa-undo-alt"></i
							></b-btn>
							<b-btn @click="deleteTask"
								><i class="fas fa-trash-alt"></i
							></b-btn>
						</div>
					</template>
				</b-card>
			</b-col>
		</b-row>
		<b-row class="w-50" cols="1">
			<b-col>
				<h6 class="text-center m-3">Uncompleted Tasks</h6>
				<b-list-group>
					<b-list-group-item
						v-for="task in uncompletedTasks"
						v-bind:key="task.id"
						@click="selectTask(task.id)"
					>
						{{ task.title }}
					</b-list-group-item>
				</b-list-group>
			</b-col>
		</b-row>
		<b-row class="w-50" cols="1">
			<b-col>
				<h6 class="text-center m-3">Completed Tasks</h6>
				<b-list-group>
					<b-list-group-item
						v-for="task in completedTasks"
						v-bind:key="task.id"
						@click="selectTask(task.id)"
						class="text-decoration-line-through"
					>
						{{ task.title }}
					</b-list-group-item>
				</b-list-group>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			description: '',
			timer: null,
		}
	},
	computed: {
		currentTask() {
			return this.$store.getters.getCurrentTask
		},
		uncompletedTasks() {
			return this.$store.getters.getUncompletedTasks
		},
		completedTasks() {
			return this.$store.getters.getCompletedTasks
		},
		formatedTimer() {
			return new Date(this.currentTask.timer * 1000).toISOString().substr(11, 8)
		},
	},
	methods: {
		startTimer() {
			this.$store.commit('toggleTimer')
			this.timer = setInterval(() => {
				this.$store.commit('timerTick')
			}, 1000)
		},
		stopTimer() {
			this.$store.commit('toggleTimer')
			clearTimeout(this.timer)
			this.timer = null
		},
		addTask() {
			this.$store.commit('addTask', {
				title: this.title,
				description: this.description,
			})
		},
		selectTask(id) {
			if (this.timer) this.stopTimer()
			this.$store.commit('removeActiveTask')
			this.$store.commit('setActiveTask', {
				id,
			})
		},
		toggleCompletionTask() {
			if (this.timer) this.stopTimer()
			this.$store.commit('toggleCompletionTask')
			// this.$store.commit('removeActiveTask')
		},
		deleteTask() {
			if (this.timer) this.stopTimer()
			this.$store.commit('deleteTask', { index: this.currentTask.index })
		},
	},
	mounted() {
		this.$store.commit('loadState')
	},
	updated() {
		this.$store.commit('saveState')
	},
	beforeDestroy() {
		this.stopTimer()
	},
}
</script>

<style>
body {
	display: flex;
	min-height: 100vh;
	align-items: center;
	justify-content: center;
}
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: gray;
	/* min-width: 90vw;
	min-height: 90vh; */
	border-radius: 1vw;
}

.form {
	/* max-width: 90%; */
}
.task__header {
	display: flex;
	justify-content: space-between;
}

.task__footer {
	display: flex;
	justify-content: space-between;
}
</style>
