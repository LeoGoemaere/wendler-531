<template>

	<div class="select-container">
		<div class="select">
			<p class="select__label">Variation</p>
			<select class="select__item" id="selectVariation" @change="updateCurrentVariation($event), updateSelectedVariation($event), resetSelectedTemplate('selectTemplate'), resetSelectedWeek('selectWeek')">
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
					v-for="(template, key) in currentVariation.templates"
					:key="template.id"
					:value="key"
				>{{template.name}}</option>
			</select>
		</div>

		<div class="select">
			<p class="select__label">Week</p>
			<select class="select__item" id="selectWeek" @change="updateSelectedWeek">
				<option 
					v-for="(week, key) in currentVariation.templates[selectedTemplate].weeks"
					:key="week.id"
					:value="key"
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
		selectedTemplate: String,
		selectedWeek: String
	},
	mounted() {
		document.querySelector('#selectVariation').value = this.selectedVariation; // Todo: récuperer la valeur de la clé plutot que l'objet
		document.querySelector('#selectTemplate').value = this.selectedTemplate;
		document.querySelector('#selectWeek').value = this.selectedWeek;
	},
	methods: {
		updateCurrentVariation(e) {
			this.$store.commit('updateCurrentVariation', this.variations[e.target.value]);
		},
		updateSelectedVariation(e) {
			this.$store.commit('updateSelectedVariation', e.target.value);
		},
		updateSelectedTemplate(e) {
			this.$store.commit('updateSelectedTemplate', e.target.value);
		},
		updateSelectedWeek(e) {
			this.$store.commit('updateSelectedWeek', e.target.value);
		},
		resetSelectedTemplate(selectId) {
			this.$store.commit('updateSelectedTemplate', 'template_1');
			// Update the select in DOM.
			document.querySelector(`#${selectId}`).value = 'template_1';
		},
		resetSelectedWeek(selectId) {
			this.$store.commit('updateSelectedWeek', 'week_1');
			// Update the select in DOM.
			document.querySelector(`#${selectId}`).value = 'week_1';
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
		height: 44px;
	}
</style>