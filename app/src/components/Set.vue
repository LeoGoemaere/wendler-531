<template>
	<div class="set__content">
		<span :class="{ 'set__number--extra': extraSet }" class="set__number">{{index + 1}}</span>
		<div class="set__reps-datas">
			<span class="set__reps">
				<span v-if="extraSet">{{extraSet.type === 'fsl' ? 'AMRAP' : ''}}</span>
				<span v-if="!extraSet || extraSet.type !== 'fsl'">
					{{set.isAmrap ? 'AMRAP' : set.reps}} {{prSet}}
				</span>
			</span>
			<span v-if="set.tm" class="set__at">@</span>
			<span v-if="set.tm" class="set__weight">{{roundValue(set.tm * tmExercice)}}</span>
			<span v-if="set.tm" class="set__unit">kg</span>
			<span v-if="!set.tm" class="set__reps-label">reps</span>
			<p v-if="!extraSet" class="set__info">{{roundValue(set.tm * 100)}}% TM</p>
		</div>
		<p v-if="extraSet" :class="`set__type--${extraSet.type}`" class="set__type">
			{{extraSet.name}}
		</p>
	</div>
</template>

<script>

export default {
	name: 'Set',
	props: {
		set: Object,
		tmExercice: Number,
		index: Number,
		extraSet: Object
	},
	data () {
		return {
			prSet: this.set.pr ? "+" : null
		}
	},
	methods: {
		roundValue: function(value) {
			return isNaN(value) ? 0 : Math.ceil(value * 4) / 4;
		}
	}
}
</script>

<style scoped>
	.set__content {
		display: flex;
		flex: 1;
	}

	.set__type {
		margin-left: auto;
		margin-right: 20px;
	}

	.set__type--joker {
		color: #16a085;
	}

	.set__type--fsl {
		color: #2980b9;
	}

	.set__info {
		margin-left: auto;
		opacity: .5;
	}

	.set__reps-datas {
		margin-left: 20px;
		display: flex;
		flex: 1;
	}

	.set__number {
		display: block;
		height: 20px;
		width: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 50%;
		background-color: #b3b3b3;
		color: white;
		font-size: 12px;
		color: #fff;
	}

	.set__number--extra {
		background-color: #34495eb3;
	}

	.set__at,
	.set__unit {
		color: #737373;
	}

	.set__unit {
		margin-left: 3px;
	}

	.set__at {
		margin: 0 5px;
	}

	.set__reps {
		color: #ea9852;
		font-weight: 600;
	}

	.set__reps-label {
		display: block;
		margin-left: 5px;
	}
</style>