<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`week-${variationName}-${templateIndex}-${index}`"/>
        <label class="accordion__title" :for="`week-${variationName}-${templateIndex}-${index}`">
            <span>{{ weekName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="value" class="input" type="text" placeholder="Name">

            <Day />

           

        </div>
    </div>
</template>

<script>
    import Day from '@/components/Day.vue';

    export default {
        name: 'Week',
        props: {
            week: Object,
            variationName: String,
            templateIndex: Number,
            index: Number
        },
        components: {
            Day
        },
        data: function() {
            return {
                value: null
            }
        },
        computed: {
            weekName: function() {
                if (this.value) {
                    return this.value;
                } else if (this.week.name) {
                    return this.week.name;
                } else {
                    return 'Week Name'
                }
            }
        }
    }
</script>