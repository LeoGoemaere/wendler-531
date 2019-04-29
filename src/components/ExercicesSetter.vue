<template>
	<div>
		<button @click="isPrimaryExercices">Primary</button>
		<button @click="isSecondaryExercices">Assistance</button>
		<div v-if="isPrimarySelected">
			<ExerciceLineItem 
				v-for="(exercice, index) in this.primaryExercices"
				:key="exercice.id"
				:exercice="exercice"
				:index="parseInt(index)"
				:type="'primary'"
			/>
		</div>
		<div v-else>
			<ExerciceLineItem 
				v-for="(exercice, index) in this.secondaryExercices"
				:key="exercice.id"
				:exercice="exercice"
				:index="parseInt(index)"
				:type="'secondary'"
			/>
		</div>
	</div>
</template>

<script>
import ExerciceLineItem from '@/components/ExerciceLineItem';
export default {
	name: 'Set',
	components: { ExerciceLineItem },
	props: {
		primaryExercices: Object,
		secondaryExercices: Object
	},
	data () {
		return {
			isPrimarySelected: true
		}
	},
	methods: {
		isPrimaryExercices: function() {
			this.isPrimarySelected = true
		},
		isSecondaryExercices: function() {
			this.isPrimarySelected = false
		}
	}
}
</script>

<style scoped>

</style>