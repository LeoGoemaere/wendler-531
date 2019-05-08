<template>

	<div class="select-container">
		<div class="select">
			<p class="select__label">Variation</p>
			<select class="select__item" id="selectVariation" @change="updateSelectedVariation($event), resetSelectedTemplate('selectTemplate'), resetSelectedWeek('selectWeek')">
				<option 
					v-for="(variation, key) in variations"
					:key="variation.id"
					:value="key"
				>{{variation.name}}</option>
			</select>
		</div>

		<div class="select">
			<p class="select__label">Template</p>
			<select class="select__item" id="selectTemplate" @change="updateSelectedTemplate($event), resetSelectedWeek('selectWeek')">
				<option 
					v-for="(template, index) in currentVariation.templates"
					:key="template.id"
					:value="index"
				>{{template.name}}</option>
			</select>
		</div>

		<div class="select">
			<p class="select__label">Week</p>
			<select class="select__item" id="selectWeek" @change="updateSelectedWeek">
				<option 
					v-for="(week, index) in currentVariation.templates[selectedTemplate].weeks"
					:key="week.id"
					:value="index"
				>{{week.name}}</option>
			</select>
		</div>
	</div>

</template>

<script>

export default {
	name: 'Select',
	props: {
		variations: Object,
		currentVariation: Object,
		selectedVariation: String,
		selectedTemplate: Number,
		selectedWeek: Number
	},
	mounted() {
		document.querySelector('#selectVariation').value = this.selectedVariation;
		document.querySelector('#selectTemplate').value = this.selectedTemplate;
		document.querySelector('#selectWeek').value = this.selectedWeek;
	},
	methods: {
		updateSelectedVariation(e) {
			this.$store.commit('updateSelectedVariation', e.target.value);
		},
		updateSelectedTemplate(e) {
			this.$store.commit('updateSelectedTemplate', parseInt(e.target.value));
		},
		updateSelectedWeek(e) {
			this.$store.commit('updateSelectedWeek', parseInt(e.target.value));
		},
		resetSelectedTemplate(selectId) {
			this.$store.commit('updateSelectedTemplate', 0);
			// Update the select in DOM.
			document.querySelector(`#${selectId}`).value = 0;
		},
		resetSelectedWeek(selectId) {
			this.$store.commit('updateSelectedWeek', 0);
			// Update the select in DOM.
			document.querySelector(`#${selectId}`).value = 0;
		}
	}
}
</script>

<style scoped>
	.select-container {
		margin-bottom: 20px;
		display: flex;
	}
	.select {
		flex: 1;
	}
	.select + .select {
		margin-left: 5px;
	}
	.select__label {
		margin-bottom: 5px;
		font-size: 17px;
	}
	.select__item {
		height: 30px;
	}
</style>