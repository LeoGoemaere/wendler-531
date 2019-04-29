<template>
	<div>
	<ExerciceLineItem 
		v-for="(exercice, index) in this.primaryExercices"
		:key="exercice.id"
		:exercice="exercice"
		:index="parseInt(index)"
		:type="'primary'"
	/>
	</div>
</template>

<script>
import ExerciceLineItem from '@/components/ExerciceLineItem';
// <ExerciceLineItem 
// 			v-for="(exercice, index) in this.primaryExercices"
// 			:key="exercice.id"
// 			:exercices="this.primaryExercices"
// 			:type="'primaryExercices'"
// 			:index="parseInt(index)"
// 		/>
export default {
	name: 'Set',
	components: { ExerciceLineItem },
	props: {
		primaryExercices: Object,
		secondaryExercices: Object
	},
	data () {
		return {
		}
	},
	methods: {
	}
}
</script>

<style scoped>

</style>