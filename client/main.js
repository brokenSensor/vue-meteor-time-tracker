import Vue from 'vue'

import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'
import store from '../imports/ui/store'

Meteor.startup(() => {
	new Vue({
		el: '#app',
		...App,
		store: store,
	})
})
