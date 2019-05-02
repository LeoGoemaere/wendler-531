<template>
	<div class="assistance">
		<div class="assistance__button-container space__x">
			<button class="button" @click="showPopin">Create new assistance</button>
		</div>
		<div :class="popinActiveClass" class="popin__element">
			<p class="popin__title">Add new assistance exercice</p>
			<div class="popin__input-row">
				<input type="text" class="popin__input" placeholder="Exercice name" @change="this.editExercice" />
			</div>
			<div class="exercices__buttons">
				<button :class="" class="button-action" @click="createExercice">Create Exercice</button>
				<button class="button-action" @click="cancelAddExercice">Cancel</button>
			</div>
		</div>
		<ExerciceLineItem 
			v-for="(exercice, index) in this.exercices.secondary"
			:key="exercice.id"
			:exercice="exercice"
			:index="parseInt(index)"
			:type="'secondary'"
		/>
		<div :class="popinActiveClass" class="popin__overlay" @click="cancelAddExercice"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import uuid from 'uuid/v4';
import ExerciceLineItem from '@/components/ExerciceLineItem';
export default {
	name: 'ExercicesSetter',
	components: { ExerciceLineItem },
	props: {
		exercices: Object
	},
	data () {
		return {
			popinActiveClass: null,
			assistancEdited: null,
			maxSetter: {
				max: {
					rm: 0,
					tm: 0
				}
			}
		}
	},
	methods: {
		showPopin() {
			this.popinActiveClass = 'is-active'
		},
		closePopin() {
			this.popinActiveClass = null;
		},
		isPrimaryExercices: function() {
			this.isPrimarySelected = true
		},
		isSecondaryExercices: function() {
			this.isPrimarySelected = false
		},
		editExercice: function(e) {
			this.assistancEdited = e.target.value;
		},
		cancelAddExercice: function() {
			this.assistancEdited = null;
			this.closePopin();
			document.querySelector('.popin__input').value = "";
		},
		createExercice: function(e) {
			const assistancesLength = Object.keys(this.getExercices.secondary).length;
			// Create deep copies.
			let exercices = JSON.parse(JSON.stringify(this.exercices));
			exercices.secondary[assistancesLength] = JSON.parse(JSON.stringify(this.maxSetter));

			exercices.secondary[assistancesLength].name = this.assistancEdited;
			exercices.secondary[assistancesLength].id = uuid();
			this.$store.commit('updateExercices', exercices);
			this.cancelAddExercice();
		}
	},
	computed: {
		...mapGetters([
			'getExercices'
		])
	},
}
</script>

<style scoped>
	/* Create global styles instead */
	.assistance {
		overflow: hidden;
		margin-top: 10px;
	}
	.assistance__button-container {
		margin-bottom: 10px;
	}
</style>