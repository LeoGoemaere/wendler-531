<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`template-${variationName}-${templateIndex}`"/>
        <label class="accordion__title" :for="`template-${variationName}-${templateIndex}`">
            <span>{{ templateName }}</span>
            <span class="accordion__icon-container"><i class="fas fa-angle-down accordion__angle"></i></span>
        </label>
        <div class="accordion__content">
            <input v-model="template.name" class="input" type="text" placeholder="Name">

            <AreaText :template="template" title="Description" />

            <Week 
                v-for="(week, index) in template.weeks"
                :week="week"
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="index"
            />

        </div>
    </div>
</template>

<script>
    import AreaText from '@/components/AreaText.vue';
    import Week from '@/components/Week.vue';

    export default {
        name: 'Template',
        props: {
            template: Object,
            templateIndex: Number,
            variationName: String
        },
        components: {
            AreaText,
            Week
        },
        computed: {
            templateName: function() {
                if (this.template.name) {
                    return this.template.name;
                } else {
                    return 'Template Name'
                }
            }
        }
    }
</script>