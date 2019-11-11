<template>
	<div>
		<div class="heading space__x space__top">
			<h1>Training 2</h1>
			<div class="heading__infos">
				<p class="heading__name">{{currentVariation.name}}</p>
				<p>{{currentVariation.templates[getSelectedTemplate].name}}</p>
				<p class="heading__week">{{currentVariation.templates[getSelectedTemplate].weeks[getSelectedWeek].name}}</p>
			</div>
		</div>
		
		<AddExercice 
			v-for="(lift, index) in this.lifts"
			:key="lift.id"
			:exercices="exercices"
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
			trainingIndex: 1,
			day: 1,
			currentVariation: null,
			exercices: null,
			lifts: []
		}
	},
	created() {
		const variations = JSON.parse(JSON.stringify(this.getVariations));
		this.currentVariation = variations[this.getSelectedVariation];
	},
	mounted() {
		this.exercices = JSON.parse(JSON.stringify(this.$store.state.exercices));
		let variationLifts = this.currentVariation.templates[this.getSelectedTemplate].weeks[this.getSelectedWeek].days[this.day];
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
			'getSelectedTemplate',
			'getSelectedWeek',
			'getVariations',
			'getSelectedVariation'
		])
	}
}
</script>

<style scoped>

</style>