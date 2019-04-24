<template>
	<div>
		<div class="heading">
			<h1>Training 1</h1>
			<div class="heading__infos">
				<p>{{getCurrentVariation.name}}</p>
				<p class="heading__week">{{getCurrentVariation.templates[getSelectedTemplate].weeks[getSelectedWeek].name}}</p>
			</div>
		</div>
		
		<AddExercice :exercices="primaryExercices" :index="0" :day="'day_1'" :trainingId="pageId" />

		<AddExercice :exercices="primaryExercices" :index="1" :day="'day_1'" :trainingId="pageId" />
		<!--<Set 
			v-for="exercice in this.exercices"
			:reps="1"
			:key="exercice.id"
		/>-->
	</div>
</template>

<script>

import Set from '@/components/Set';
import AddExercice from '@/components/AddExercice';
import { EventBus } from '@/event-bus';

export default {
	name: 'View1',
	components: { Set, AddExercice },
	data () {
		return {
			pageId: 'training_1',
			training: {},
			primaryExercices: this.$store.state.primaryExercices,
			secondaryExercices: {1: 'test'}
		}
	},
	mounted() {
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
		getCurrentVariation() {
			return this.$store.state.currentVariation;
		},
		getSelectedTemplate() {
			return this.$store.state.selectedTemplate;
		},
		getSelectedWeek() {
			return this.$store.state.selectedWeek;
		}
	}
}
</script>

<style scoped>

</style>