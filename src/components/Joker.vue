<template>
	<div>
		<Set
			:set="set"
			:index="index"
			:tmExercice="exerciceData.max.tm"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Set from '@/components/Set';
export default {
	name: 'Joker',
	components: { Set },
	props: {
		lift: Object,
		extraSet: Object,
		trainingIndex: Number,
		exerciceIndex: Number,
		index: Number,
		exerciceData: Object
	},
	data () {
		return {
			increaseFactor: 5, // 5%
			extraSets: null,
			set: {
				tm: null,
				reps: null
			}
		}
	},
	mounted() {
		this.extraSets = this.getTrainings[this.trainingIndex][this.exerciceIndex].extraSets;
		this.calculSetIncrement();
	},
	methods: {
		calculSetIncrement() {
			let lastSet;
			// Take the last set and increase it's tm by 5% to create joker set.
			if (this.index === 0) {
				lastSet = this.getLastSetOf(this.lift.sets);
				this.set.tm = this.incrementor(lastSet.tm, this.increaseFactor);
				this.set.reps = lastSet.reps;
			} else {

			}
		},
		getLastSetOf(sets) {
			for (let i = 0; i <= sets.length - 1; i++) {
				if (i === sets.length - 1) {
					return sets[i];
				}
			}
		},
		incrementor(tm, increaseFactor) {
			return tm += (tm * increaseFactor) / 100;
		}
	},
	computed: {
		...mapGetters([
			'getTrainings'
		])
	},
}
</script>

<style scoped>
	/* Create global styles instead */
</style>