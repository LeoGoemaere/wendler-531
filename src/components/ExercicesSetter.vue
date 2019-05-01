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
			<button>Create new assistance</button>
			<div>
				<p class="popin__title">Add new assistance exercice</p>
				<div>
					<label>Name</label>
					<input type="text" @change="this.editExercice" />
				</div>
				<div class="exercices__buttons">
					<button :class="" class="button-action" @click="this.createExercice">Create Exercice</button>
					<button class="button-action" @click="">Cancel</button>
				</div>
			</div>
			<span>{{getExercices.secondary}}</span>
			<ExerciceLineItem 
				v-for="(exercice, index) in this.exercices.secondary"
				:key="exercice.id"
				:exercice="exercice"
				:index="parseInt(index)"
				:type="'secondary'"
			/>
		</div>
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
			isPrimarySelected: false,
			assistanceCreated: null,
			maxSetter: {
				max: {
					rm: 0,
					tm: 0
				}
			}
		}
	},
	methods: {
		isPrimaryExercices: function() {
			this.isPrimarySelected = true
		},
		isSecondaryExercices: function() {
			this.isPrimarySelected = false
		},
		editExercice: function(e) {
			this.assistancEdited = e.target.value;
		},
		createExercice: function(e) {
			const assistancesLength = Object.keys(this.getExercices.secondary).length;
			// Create deep copies.
			let exercices = JSON.parse(JSON.stringify(this.exercices));
			exercices.secondary[assistancesLength] = JSON.parse(JSON.stringify(this.maxSetter));

			exercices.secondary[assistancesLength].name = this.assistancEdited;
			exercices.secondary[assistancesLength].id = uuid();
			this.$store.commit('updateExercices', exercices);
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
	.popin__container {
		padding: 10px;
	}
	.popin__title {
		color: #000;
		font-size: 17px;
		font-weight: 600;
		padding: 15px 10px;
	}
	.popin__element {
		display: none;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		background-color: #fff;
		width: 80vw;
		border-radius: 5px;
		overflow: hidden;
		opacity: 0;
		transition: opacity .3s ease-out;
	}
	.popin__element.is-active {
		display: block;
		opacity: 1;
		transition: opacity .3s ease-out;
	}
	.popin__overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 5;
	}

	.popin__overlay.is-active {
		display: block;
	}
	.exercices__buttons {
		display: flex;
		padding: 10px;
		margin-top: 10px;
	}
</style>