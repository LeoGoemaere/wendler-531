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
	name: 'Fsl',
	components: { Set },
	props: {
		lift: Object,
		index: Number,
		exerciceData: Object,
		extraSet: Object
	},
	data () {
		return {
			extraSets: null,
			set: {
				tm: null,
				reps: null
			}
		}
	},
	mounted() {
		this.calculSet();
	},
	methods: {
		calculSet() {
			this.set.tm = this.getFirstSetOf(this.lift.sets).tm;
			this.set.reps = this.getFirstSetOf(this.lift.sets).reps;
		},
		getFirstSetOf(sets) {
			return sets[0];
		},
	}
}
</script>

<style scoped>
	/* Create global styles instead */
</style>