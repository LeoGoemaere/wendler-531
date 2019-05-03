<template>
	<div>
		<div class="heading space__x space__top">
			<h1>Training 1</h1>
			<div class="heading__infos">
				<p>{{getCurrentVariation.name}}</p>
				<p class="heading__week">{{getCurrentVariation.templates[getSelectedTemplate].weeks[getSelectedWeek].name}}</p>
			</div>
		</div>
		
		<AddExercice 
			v-for="(lift, index) in this.lifts"
			:key="lift.id"
			:exercices="exercices[lift.type]"
			:type="lift.type"
			:lift="lift"
			:setOrder="index"
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
			trainingIndex: 0,
			day: 'day_1',
			exercices: this.$store.state.exercices,
			lifts: []
		}
	},
	mounted() {
		let trainingCycleLift = this.getTrainingCycles[this.getSelectedWeek];
		trainingCycleLift.type = 'primary';
		let variationLifts = this.getCurrentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek][this.day];

		this.lifts.push(trainingCycleLift);
		variationLifts.forEach(lift => { 
			lift.type = "secondary";
			this.lifts.push(lift) 
		});
	},
	computed: {
		...mapGetters([
			'getCurrentVariation',
			'getSelectedTemplate',
			'getSelectedWeek',
			'getTrainings',
			'getTrainingCycles'
		])
	}
}
</script>

<style scoped>

</style>