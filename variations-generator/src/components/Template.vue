<template>
    <div>
        <input class="accordion__input" type="checkbox" id="template-1"/>
        <label class="accordion__title" for="template-1">
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
                } else if (this.name) {
                    return this.name;
                } else {
                    return 'Template Name'
                }
            }
        }
    }
</script>