import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CurrentVariations from '../../app/src/datas/variations.json';

export default new Vuex.Store({
	state: {
		variations: CurrentVariations
	},
	mutations: {
		updateVariations: (state, variations) => {
			state.variations = variations;
		}
	},
	getters: {
		getVariations: (state) => {
			return state.variations;
		},
	},
	actions: {

	}
})
