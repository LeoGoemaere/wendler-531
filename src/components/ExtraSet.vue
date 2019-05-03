<template>
	<li v-if="!isSetValidated" class="set extraset extraset--add">
		<button class="extraset__button" @click="showPopin">
			<i class="fas fa-plus-circle icon__plus"></i>
			Add Extra Set
		</button>
		<div :class="{ 'is-active': popinIsActive }" class="popin__element">
			<p class="popin__title">Chose your Extra Set</p>
			<ul>
				<li v-for="(set, index) in extraSets">
					<input type="radio" @change="setSelection(index)" :id="set.id" :value="set.id" name="extrasets" class="js-extraset-select row__select" />
					<label :for="set.id">
						{{set.name}}
						<i class="fas fa-check"></i>
					</label>
				</li>
			</ul>
			<div class="buttons">
				<button :class="{ 'button-action--disabled': !isSetSelectionned }" class="button-action" @click="addSet">Add Extra Set</button>
				<button class="button-action" @click="cancelAddSet">Cancel</button>
			</div>
		</div>
		<div :class="{ 'is-active': popinIsActive }" class="popin__overlay" @click="cancelAddSet"></div>
	</li>
	<li v-else class="set extraset">
		<NewExtraSet />
	</li>
</template>

<script>
import NewExtraSet from '@/components/NewExtraSet';
export default {
	name: 'ExtraSet',
	components: { NewExtraSet },
	props: {
	},
	data () {
		return {
			popinIsActive: false,
			isSetSelectionned: false,
			isSetValidated: false,
			setIndex: null,
			extraSets: [
				{
					id: 'joker',
					name: 'Joker',
				},
				{
					id: 'fsl',
					name: 'First Set Last'
				}
			]
		}
	},
	methods: {
		showPopin() {
			this.popinIsActive = true;
		},
		closePopin() {
			this.popinIsActive = false;
		},
		setSelection(index) {
			this.setIndex = index;
			this.isSetSelectionned = true;
		},
		cancelAddSet() {
			this.setIndex = null;
			this.isSetSelectionned = false;
			this.isSetValidated = false;
			this.popinIsActive = false;
			document.querySelectorAll('.js-extraset-select').forEach(set => set.checked = false);
		},
		addSet() {
			if (!this.isSetSelectionned) return;

			this.set = this.extraSets[this.setIndex];

			this.isSetValidated = true;
			this.closePopin();
		},
	},
	computed: {
	},
}
</script>

<style scoped>
	/* Create global styles instead */
	.extraset {
		position: relative;
		padding: 15px 0;
	}

	.extraset::before {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.extraset--add {
		padding: 0;
	}

	.extraset__button {
		width: 100%;
		background-color: transparent;
		border: none;
		padding: 15px 0;
		font-size: 15px;
		text-align: left;
		display: flex;
		align-items: center;
	}
	.icon__plus {
		color: #ea9852;
		font-size: 20px;		
		margin-right: 20px;
	}
</style>