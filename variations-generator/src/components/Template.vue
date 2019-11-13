<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`template-${variationName}-${templateIndex}`"/>
        <label class="accordion__title" :for="`template-${variationName}-${templateIndex}`">
            <span>{{ templateName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="value" class="input" type="text" placeholder="Name">

            <AreaText value="Description" />

            <Week 
                v-for="(week, index) in template.weeks"
                :week="week"
                :variationName="variationName"
                :templateIndex="templateIndex"
                :index="index"
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
        data: function() {
            return {
                value: null
            }
        },
        computed: {
            templateName: function() {
                if (this.value) {
                    return this.value;
                } else if (this.template.name) {
                    return this.template.name;
                } else {
                    return 'Template Name'
                }
            }
        }
    }
</script>