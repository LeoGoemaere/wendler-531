<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`template-${variationName}-${templateIndex}`"/>
        <label class="accordion__title accordion__title--secondary" :for="`template-${variationName}-${templateIndex}`">
            <span>{{ templateName }}</span>
            <span class="accordion__icon-container">
                <span class="accordion__type">Template</span>
                <button @click="removeTemplate" class="button is-small is-danger is-light"><i class="far fa-trash-alt"></i></button>
                <i class="fas fa-angle-down accordion__angle"></i>
            </span>
        </label>
        <div class="accordion__content accordion__content--secondary">
            <input v-model="template.name" class="input" type="text" :placeholder="templateName">

            <!-- Disable description area until 531 app don't use this information.-->
            <!-- <AreaText :template="template" title="Description" /> -->

            <AddWeek 
                :variationName="variationName"
                :templateIndex="templateIndex"
            />
            <Week 
                v-for="(week, index) in template.weeks"
                :key="week.id"
                :week="week"
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="index"
            />

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import AreaText from '@/components/AreaText.vue';
    import Week from '@/components/Week.vue';
    import AddWeek from '@/components/AddWeek.vue';

    export default {
        name: 'Template',
        props: {
            template: Object,
            templateIndex: Number,
            variationName: String
        },
        components: {
            AreaText,
            Week,
            AddWeek
        },
        methods: {
            removeTemplate: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const templates = variations[this.variationName].templates;
                // At least 1 template has to be exist.
                if (templates.length > 1) {
                    templates.splice(this.templateIndex, 1);
                    this.$store.commit('updateVariations', variations);
                }
            }
        },
        computed: {
            templateName: function() {
                if (this.template.name) {
                    return this.template.name;
                } else {
                    return 'Template Name'
                }
            },
            ...mapGetters([
                'getVariations'
            ])
        }
    }
</script>