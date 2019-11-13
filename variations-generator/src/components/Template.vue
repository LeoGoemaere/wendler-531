<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`template-${name}-${index}`"/>
        <label class="accordion__title" :for="`template-${name}-${index}`">
            <span>{{ templateName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="value" class="input" type="text" placeholder="Name">

            <AreaText value="Description" />

            <Week />


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
            index: Number,
            name: String
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