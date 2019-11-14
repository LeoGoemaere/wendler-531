<template>
	<div class="accordion">
        <input class="accordion__input" type="checkbox" :id="`accordion-${index}`"/>
        <label class="accordion__title has-text-weight-bold" :for="`accordion-${index}`">
            <span>{{ variationName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="variation.name" class="input" type="text" placeholder="Name">
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
    import { mapGetters } from 'vuex';

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
        methods: {
            // removeSpecialCharacters: function(string) {
            //     return string.replace(/[^\w\s]/gi, '');
            // },
            // convertToDiacriticInsensitive: function(string) {
            //     // Remove accents.
            //     return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            // },
            // removeSpaceFrom: function(string) {
            //     return string.split(' ').join('');
            // },
            // generateVariationKeyName: function(string) {
            //     const key = this.removeSpecialCharacters(
            //         this.convertToDiacriticInsensitive(
            //             this.removeSpaceFrom(string.toLowerCase())
            //         )
            //     );
            //     return key;
            // },
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