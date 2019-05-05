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
						<p class="notif-popin__description">Delete this exercice and all his associated sets</p>
						<button @click="this.deleteAssistance" class="notif-popin__button notif-popin__button--delete">Delete this exercice</button>
					</div>
					<button @click="closeNotif" class="notif-popin__button notif-popin__button--cancel">Cancel</button>
				</div>
				<div :class="{ 'is-active': notifIsActive }" class="popin__overlay" @click="closeNotif"></div>
			</div>
		</div>
		<div class="datas">
			<div class="datas__item">
				<label class="datas__label">rm</label>
				<input class="datas__input" type="number" @input="calculPerf($event, { from: max.rm, to: max.tm })" :value="roundValue(exercice.max.rm)">
				<label class="datas__label datas__label--unit">kg</label>
			</div>
			<div class="datas__item">
				<label class="datas__label datas__label--tm">tm</label>
				<input class="datas__input datas__input--tm" type="number" @input="calculPerf($event, { from: max.tm, to: max.rm })" :value="roundValue(exercice.max.tm)">
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
		width: 30px;
		line-height: 35px;
		font-size: 12px;
		text-align: center;
		text-transform: uppercase;
		border: 2px solid #ea9852;
		color: #ea9852;
		border-radius: 4px;
   		border-bottom-right-radius: 0;
	}

	.datas__label--tm {
		border: 2px solid #34495e;
		color: #34495e;
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

	.datas__input {
		width: calc(100% - 60px);
		border: none;
		padding: 0 10px;
		box-sizing: border-box;
		border-bottom: 2px solid #ea9852;
		color: #ea9852;
	}
	.datas__input--tm {
		color: #34495e;
		border-bottom: 2px solid #34495e;
	}
</style>