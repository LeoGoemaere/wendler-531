import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VuexPersist from 'vuex-persist';
import Exercices from '@/datas/exercices.json';
import Variations from '@/datas/variations.json';

const vuexPersist = new VuexPersist({
	key: 'Wendler-531',
	storage: localStorage
})

export default new Vuex.Store({
  state: {
    exercices: Exercices,
		variations: Variations,
		selectedVariation: Object.keys(Variations)[0],
		selectedTemplate: 0,
		selectedWeek: 0,
		trainings: [
			[],
			[],
			[],
			[]
    ],
  },
  plugins: [vuexPersist.plugin],
  mutations: {
    updateExercices(state, exercices) {
			for(let key in exercices) {
				state.exercices[key] = exercices[key];
			}
		},
		updateTrainings(state, trainings) {
			state.trainings = trainings;
		},
		updateSelectedVariation(state, selectedVariation) {
			state.selectedVariation = selectedVariation;
		},
		updateSelectedTemplate(state, selectedTemplate) {
			state.selectedTemplate = selectedTemplate;
		},
		updateSelectedWeek(state, selectedWeek) {
			state.selectedWeek = selectedWeek;
		}
  },
  getters: {
		getVariations: (state) => {
			return state.variations;
		},
		getSelectedVariation: (state) => {
			return state.selectedVariation;
		},
		getSelectedTemplate: (state) => {
			return state.selectedTemplate;
		},
		getSelectedWeek: (state) => {
			return state.selectedWeek;
		},
		getExercices: (state) => {
			return state.exercices;
		},
		getTrainings: (state) => {
			return state.trainings;
		}
	},
  actions: {

  }
})
