import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Exercices from '@/datas/exercices.json';
import Variations from '@/datas/variations.json';
// 531 training cycle program.
import TrainingCycles from '@/datas/training-cycles.json';

export default new Vuex.Store({
	state: {
		exercices: Exercices,
		trainingCycle: TrainingCycles,
		variations: Variations,
		currentVariation: Variations.bbb,
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
		getVariations: (state) => {
			return state.variations;
		},
		getCurrentVariation: (state) => {
			return state.currentVariation;
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
	mutations: {
		updateExercices(state, exercices) {
			for(let key in exercices) {
				state.exercices[key] = exercices[key];
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