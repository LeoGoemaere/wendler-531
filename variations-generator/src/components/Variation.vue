<template>
	<div class="accordion">
        <input class="accordion__input" type="checkbox" :id="`accordion-${index}`"/>
        <label class="accordion__title has-text-weight-bold" :for="`accordion-${index}`">
            <span>{{ variationName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="variationNaming" class="input" type="text" placeholder="Name">

            <Template 
                v-for="(template, index) in variation.templates"
                :template="template"
                :templateIndex="index"
                :variationName="name"
            />
        </div>
    </div>
</template>

<script>

    import Template from '@/components/Template.vue'

    export default {
        name: 'Variation',
        props: {
            variation: Object,
            index: Number,
            name: String
        },
        components: {
            Template
        },
        data: function() {
            return {
                variationNaming: null
            }
        },
        computed: {
            variationName: function() {
                if (this.variationNaming) {
                    return this.variationNaming;
                } else if (this.variation.name) {
                    return this.variation.name;
                } else {
                    return 'Program Name'
                }
            }
        }
    }
</script>