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
			:index="0" 
			:day="day" 
			:trainingId="pageId" 
		/>

		<AddExercice 
			:exercices="exercices.primary"
			:type="'primary'"
			:index="1" 
			:day="day" 
			:trainingId="pageId" 
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
			training: {},
			day: 'day_1',
			exercices: this.$store.state.exercices,
			lifts: null,
			secondaryExercices: {1: 'test'}
		}
	},
	mounted() {
		this.lifts = this.getCurrentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek][this.day]
		this.training = this.$store.state.trainings[this.pageId];
		EventBus.$on('exercice-is-added', this.handlerAddEvent);
		EventBus.$on('exercice-is-removed', this.handlerRemoveEvent);
	},
	beforeDestroy() {
		EventBus.$off('exercice-is-added', this.handlerAddEvent);
		EventBus.$off('exercice-is-removed', this.handlerRemoveEvent);
	},
	methods: {
		handlerAddEvent(exerciceToAdd) {
			this.training[exerciceToAdd.index] = exerciceToAdd.exercice;
			this.$store.state.trainings[this.pageId] = this.training;
		},
		handlerRemoveEvent(exerciceToRemove) {
			console.log('test')
			delete this.training[exerciceToRemove.index];
			this.$store.state.trainings[this.pageId] = this.training;
		},
	},
	computed: {
		...mapGetters([
			'getCurrentVariation',
			'getSelectedTemplate',
			'getSelectedWeek'
		])
	}
}
</script>

<style scoped>

</style>