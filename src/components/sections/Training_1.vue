<template>
	<div>
		<div class="heading">
			<h1>Training 1</h1>
			<div class="heading__infos">
				<p>{{getCurrentVariation.name}}</p>
				<p class="heading__week">{{getCurrentVariation.templates[getSelectedTemplate].weeks[getSelectedWeek].name}}</p>
			</div>
		</div>
		
		<AddExercice 
			:exercices="exercices.primary"
			:type="'primary'"
			:setIndex="0" 
			:day="day" 
			:trainingIndex="trainingIndex" 
		/>

		<AddExercice 
			:exercices="exercices.secondary"
			:type="'secondary'"
			:setIndex="1" 
			:day="day" 
			:trainingIndex="trainingIndex" 
		/>

	</div>
</template>

<script>

import AddExercice from '@/components/AddExercice';
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
	name: 'View1',
	components: { Set, AddExercice },
	data () {
		return {
			pageId: 'training_1',
			trainingIndex: 0,
			training: {},
			day: 'day_1',
			exercices: this.$store.state.exercices,
			lifts: null,
			secondaryExercices: {1: 'test'}
		}
	},
	mounted() {
		this.lifts = this.getCurrentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek][this.day]
		// this.training = typeof this.getTraining[this.trainingIndex] !== 'undefined' ? this.getTraining[this.trainingIndex] : null; 
		// this.training = this.$store.state.trainings[this.trainingIndex];
		// EventBus.$on('exercice-is-added', this.handlerAddEvent);
		// EventBus.$on('exercice-is-removed', this.handlerRemoveEvent);
	},
	beforeDestroy() {
		EventBus.$off('exercice-is-added', this.handlerAddEvent);
		EventBus.$off('exercice-is-removed', this.handlerRemoveEvent);
	},
	methods: {
		handlerAddEvent(exerciceToAdd) {
			this.training[exerciceToAdd.index] = exerciceToAdd.exercice;
			this.$store.state.trainings[this.pageId] = this.training;
			console.log(this.training)
		},
		handlerRemoveEvent(exerciceToRemove) {
			delete this.training[exerciceToRemove.index];
			this.$store.state.trainings[this.pageId] = this.training;
		},
	},
	computed: {
		...mapGetters([
			'getCurrentVariation',
			'getSelectedTemplate',
			'getSelectedWeek',
			'getTrainings'
		])
	}
}
</script>

<style scoped>

</style>