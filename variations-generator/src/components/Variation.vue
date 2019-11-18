<template>
	<div class="accordion">
        <input class="accordion__input" type="checkbox" :id="`accordion-${index}`"/>
        <label class="accordion__title accordion__title--primary has-text-weight-bold" :for="`accordion-${index}`">
            <span>{{ variationName }}</span>
            <span class="accordion__icon-container">
                <span class="accordion__type">Variation</span>
                <button @click="removeVariation" class="button is-small is-danger is-light"><i class="far fa-trash-alt"></i></button>
                <i class="fas fa-angle-down accordion__angle"></i>
            </span>
        </label>
        <div class="accordion__content accordion__content--primary">
            <input v-model="variation.name" class="input" type="text" :placeholder="variationName">
            <AddTemplate 
                :variationName="name"
            />
            <Template 
                v-for="(template, index) in variation.templates"
                :key="template.id"
                :template="template"
                :templateIndex="index"
                :variationName="name"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Template from '@/components/Template.vue'
    import AddTemplate from '@/components/AddTemplate.vue'

    export default {
        name: 'Variation',
        props: {
            variation: Object,
            index: Number,
            name: String
        },
        components: {
            Template,
            AddTemplate
        },
        methods: {
            removeVariation: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                delete variations[this.name];
                this.$store.commit('updateVariations', variations);
            }
        },
        computed: {
            variationName: function() {
                if (this.variation.name) {
                    return this.variation.name;
                } else {
                    return 'Program Name'
                }
            },
            ...mapGetters([
                'getVariations'
            ])
        }
    }
</script>