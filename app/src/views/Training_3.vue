<template>
	<div>
		<div class="heading space__x space__top">
			<h1>Training 3</h1>
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
			:index="index"
		/>

	</div>
</template>

<script>

import AddExercice from '@/components/AddExercice';
import { mapGetters } from 'vuex';

export default {
	name: 'View1',
	components: { Set, AddExercice },
	data () {
		return {
			trainingIndex: 2,
			day: 2,
			exercices: this.$store.state.exercices,
			lifts: []
		}
	},
	mounted() {
		let variationLifts = this.getCurrentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek].days[this.day];

		variationLifts.forEach((lift, index) => { 
			if (index === 0) {
				lift.type = 'primary';
			} else {
				lift.type = "secondary";
			}
			this.lifts.push(lift) 
		});
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