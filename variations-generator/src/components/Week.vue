<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`week-${variationName}-${templateIndex}-${weekIndex}`"/>
        <label class="accordion__title" :for="`week-${variationName}-${templateIndex}-${weekIndex}`">
            <span>{{ weekName }}</span>
            <span class="span accordion__icon-container">
                <button @click="removeWeek" class="button is-small is-danger is-light"><i class="far fa-trash-alt"></i></button>
                <i class="fas fa-angle-down accordion__angle"></i>
            </span>
        </label>
        <div class="accordion__content">
            <input v-model="week.name" class="input" type="text" placeholder="Name">

            <Day 
                v-for="(day, index) in week.days"
                :day="day"
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="weekIndex"
                :dayIndex="index"
            />

           

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Day from '@/components/Day.vue';

    export default {
        name: 'Week',
        props: {
            week: Object,
            variationName: String,
            templateIndex: Number,
            weekIndex: Number
        },
        components: {
            Day
        },
        methods: {
            removeWeek: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const weeks = variations[this.variationName].templates[this.templateIndex].weeks;
                // At least 1 week has to be exist.
                if (weeks.length > 1) {
                    weeks.splice(this.weekIndex, 1);
                    this.$store.commit('updateVariations', variations);
                }
            }
        },
        computed: {
            weekName: function() {
                if (this.week.name) {
                    return this.week.name;
                } else {
                    return 'Week Name'
                }
            },
            ...mapGetters([
                'getVariations'
            ])
        }
    }
</script>