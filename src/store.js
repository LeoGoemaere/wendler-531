import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Exercices from '@/datas/exercices.json';
import Programs from '@/datas/programs.json';

// 531 training cycle program.
const trainingCycle = Programs.trainingCycle;

const variations = Programs.variations;

export default new Vuex.Store({
	state: {
		primaryExercices: Exercices.primary,
		trainingCycle: trainingCycle,
		variations: variations,
		currentVariation: variations.bbb,
		selectedVariation: 'bbb',
		selectedTemplate: 'template_1',
		selectedWeek: 'week_1',
		trainings: {
			training_1: {},
			training_2: {},
			training_3: {},
			training_4: {}
		}
	},
	getters: {
		getCurrentVariation: (state) => {
			return state.currentVariation;
		},
		getSelectedTemplate: (state) => {
			return state.selectedTemplate;
		},
		getSelectedWeek: (state) => {
			return state.selectedWeek;
		},
		getPrimaryExercices: (state) => {
			return state.primaryExercices;
		},
		getTrainings: (state) => {
			return state.trainings;
		}
	},
	mutations: {
		updatePrimaryExercices(state, primaryExercices) {
			for(let key in primaryExercices) {
				state.primaryExercices[key] = primaryExercices[key];
			}
		},
		updateCurrentVariation(state, currentVariation) {
			state.currentVariation = currentVariation;
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
	}
})