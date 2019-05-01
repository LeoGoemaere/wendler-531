<template>
	<div>
		<button @click="isPrimaryExercices">Primary</button>
		<button @click="isSecondaryExercices">Assistance</button>
		<div v-if="isPrimarySelected">
			<ExerciceLineItem 
				v-for="(exercice, index) in this.exercices.primary"
				:key="exercice.id"
				:exercice="exercice"
				:index="parseInt(index)"
				:type="'primary'"
			/>
		</div>
		<div v-else>
			<CreateAssistance :exercices="exercices" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import uuid from 'uuid/v4';
import ExerciceLineItem from '@/components/ExerciceLineItem';
import CreateAssistance from '@/components/CreateAssistance';
export default {
	name: 'ExercicesSetter',
	components: { ExerciceLineItem, CreateAssistance },
	props: {
		exercices: Object
	},
	data () {
		return {
			isPrimarySelected: false
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
	/* Create global styles instead */
</style>