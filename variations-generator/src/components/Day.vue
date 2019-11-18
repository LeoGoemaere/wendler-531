<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`day-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}`"/>
        <label class="accordion__title accordion__title--quaternary" :for="`day-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}`">
            <span>Day {{ dayIndex + 1 }}</span>
            <span class="accordion__icon-container">
                <i class="fas fa-angle-down accordion__angle"></i>
            </span>
        </label>
        <div class="accordion__content accordion__content--quaternary">
            <AddExercice 
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="weekIndex"
                :dayIndex="dayIndex"
            />
            <Exercice
                v-for="(exercice, index) in day"
                :key="exercice.id"
                :exercice="exercice"
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="weekIndex"
                :dayIndex="dayIndex"
                :exerciceIndex="index"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Exercice from '@/components/Exercice.vue';
    import AddExercice from '@/components/AddExercice.vue';

    export default {
        name: 'Day',
        props: {
            day: Array,
            variationName: String,
            templateIndex: Number,
            weekIndex: Number,
            dayIndex: Number
        },
        components: {
            Exercice,
            AddExercice
        },
        methods: {
        }
    }
</script>