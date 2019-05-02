<template>
	<li class="set">
		<div class="set__row">
			<span class="set__number">{{index + 1}}</span>
			<div class="set__reps-datas">
				<span class="set__reps">{{reps}}</span>
				<span class="set__at">@</span>
				<span class="set__weight">{{weight}}</span>
				<span class="set__unit">kg</span>
			</div>
		</div>
	</li>
</template>

<script>

export default {
	name: 'Set',
	props: {
		reps: Number,
		weight: Number,
		index: Number
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
	.set {
		padding: 15px 0;
		position: relative;
	}

	.set__row {
		display: flex;
	}

	.set + .set::before {
		content: "";
		height: 1px;
		background-color: #dedede;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.set__reps-datas {
		margin-left: 20px;
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

	.set__at,
	.set__unit {
		color: #737373;
	}

	.set__reps {
		color: #ea9852;
		font-weight: 600;
	}
</style>