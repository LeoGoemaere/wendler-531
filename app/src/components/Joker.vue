<template>
		<Set
			:set="set"
			:index="index"
			:tmExercice="exerciceData.max.tm"
			:extraSet="extraSet"
		/>
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
		exerciceData: Object,
		extraSet: Object
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
			let lastSet = this.getLastSetOf(this.lift.sets);
			this.set.reps = lastSet.reps;
			// Take the last set and increase it's tm by 5% to create joker set.
			if (this.index === 0) {
				this.set.tm = this.trainingMaxincrementor(lastSet.tm, this.increaseFactor);
			} else {
				let tm = lastSet.tm;
				for (let i = 0; i <= this.index; i++) {
					tm = this.trainingMaxincrementor(tm, this.increaseFactor);
				}
				this.set.tm = tm;
			}
		},
		getLastSetOf(sets) {
			for (let i = 0; i <= sets.length - 1; i++) {
				if (i === sets.length - 1) {
					return sets[i];
				}
			}
		},
		trainingMaxincrementor(tm, increaseFactor) {
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