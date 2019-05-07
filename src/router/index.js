import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/sections/Home'
import Training_1 from '@/components/sections/Training_1'
import Training_2 from '@/components/sections/Training_2'
import Training_3 from '@/components/sections/Training_3'
import Training_4 from '@/components/sections/Training_4'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/training-1',
			component: Training_1
		},
		{
			path: '/training-2',
			component: Training_2
		},
		{
			path: '/training-3',
			component: Training_3
		},
		{
			path: '/training-4',
			component: Training_4
		}
	]
})
