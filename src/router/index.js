import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/sections/Home'
import Training_1 from '@/components/sections/Training_1'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/training-1',
			component: Training_1
		}
	]
})
