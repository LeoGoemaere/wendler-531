<template>
	<div :class="exerciceOptionClass" class="exercice space__x">
		<div class="exercice__label-row">
			<p class="exercice__label">{{ exercice.name }}</p>
			<div class="exercice__options">
				<SetIncrementFactor 
					:exerciceType="type"
					:exerciceIndex="index"
				/>
				
				<i 
					v-if="type === 'secondary'" 
					@click="showNotif" 
					class="far fa-trash-alt icon__trash"></i>

				<div :class="{ 'notif-popin--active': notifIsActive }" class="notif-popin">
					<div class="notif-popin__delete-container">
						<p class="notif-popin__description">Delete the exercice and all his associated sets.</p>
						<button @click="deleteAssistance" class="notif-popin__button notif-popin__button--delete">Delete the exercice</button>
					</div>
					<button @click="closeNotif" class="notif-popin__button notif-popin__button--cancel">Cancel</button>
				</div>
				<div :class="{ 'is-active': notifIsActive }" class="popin__overlay" @click="closeNotif"></div>
			</div>
		</div>
		<div class="datas">
			<div class="datas__item">
				<label class="datas__label">rm</label>
				<div class="datas__input-container">
					<input class="datas__input" type="number" pattern="[0-9]*" @input="calculPerf($event, { from: max.rm, to: max.tm })" :value="roundValue(exercice.max.rm)">
				</div>
				<label class="datas__label datas__label--unit">kg</label>
			</div>
			<div class="datas__item">
				<label class="datas__label datas__label--tm">tm</label>
				<div class="datas__input-container datas__input-container--tm">
					<input class="datas__input datas__input--tm" type="number" pattern="[0-9]*" @input="calculPerf($event, { from: max.tm, to: max.rm })" :value="roundValue(exercice.max.tm)">
				</div>
				<label class="datas__label datas__label--unit">kg</label>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import SetIncrementFactor from '@/components/SetIncrementFactor';

export default {
	name: 'Exercice',
	components: { SetIncrementFactor },
	props: {
		exercice: Object,
		index: Number,
		type: String,
	},
	data () {
		return {
			max: {
				rm: 'rm',
				tm: 'tm'
			},
			exerciceOptionClass: null,
			notifIsActive: false
		}
	},
	methods: {
		calculPerf: function(e, {from, to}) {
			let exercices = JSON.parse(JSON.stringify(this.getExercices));

			exercices[this.type][this.index].max[from] = parseInt(e.target.value);
			exercices[this.type][this.index].max[to] = from === this.max.rm ? parseInt(e.target.value) * 0.9 : parseInt(e.target.value) / 0.9;
			this.$store.commit('updateExercices', exercices);
		},
		roundValue: function(value) {
			return isNaN(value) ? 0 : Math.ceil(value * 4) / 4;
		},
		deleteAssistance: function() {
			let exercices = JSON.parse(JSON.stringify(this.getExercices));
			exercices.secondary.splice(this.index, 1);
			
			this.$store.commit('updateExercices', exercices);
		},
		showNotif() {
			this.notifIsActive = true;
		},
		closeNotif() {
			this.notifIsActive = false;
		},
	},
	computed: {
		...mapGetters([
			'getExercices'
		])
	},
}

</script>

<style scoped>
	.exercice {
		padding-top: 6px;
		padding-bottom: 6px;
		position: relative;
		transition: transform ease-out .3s;
	}

	.exercice::after {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.exercice__label {
		font-size: 17px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.exercice__label-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.exercice__options {
		display: flex;
		align-items: center;
	}

	.datas {
		display: flex;
	}

	.datas__item {
		display: flex;
		height: 35px;
		flex: 1;
	}

	.datas__item + .datas__item {
		margin-left: 25px;
	}

	.datas + .datas {
		margin-left: 10px;
	}

	.datas__label {
		padding: 0 5px;
		line-height: 35px;
		font-size: 12px;
		text-align: center;
		text-transform: uppercase;
		color: #ea9852;
		border-radius: 4px;
   		border-bottom-right-radius: 0;
		border-top-right-radius: 0;
		border-right: 0;
		position: relative;
	}

	.datas__label::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: 1px solid #ea9852;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	.datas__label--tm {
		border-right: 0;
		color: #34495e;
	}

	.datas__label--tm::before {
		border: 1px solid #34495e;
	}

	.datas__label--unit {
		background-color: transparent;
		color: #737373;
		text-transform: none;
		border: none;
		line-height: normal;
		font-size: 17px;
		align-self: flex-end;
	}

	.datas__label--unit::before {
		content: none;
	}

	.datas__input-container {
		position: relative;
		display: flex;
	}

	.datas__input-container::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: 1px solid #ea9852;
		border-left: none;
		z-index: -1;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	.datas__input-container--tm::before {
		border: 1px solid #34495e;
		border-left: none;
	}

	.datas__input {
		width: 100%;
		border: none;
		padding: 0 10px;
		box-sizing: border-box;
		color: #ea9852;
		font-size: 16px;
		background-color: transparent;
	}

	.datas__input--tm {
		color: #34495e;
	}
</style>