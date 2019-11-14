<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`day-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}`"/>
        <label class="accordion__title" :for="`day-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}`">
            <span>Day {{ dayIndex + 1 }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <Exercice
                v-for="(exercice, index) in day"
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
    import Exercice from '@/components/Exercice.vue';

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
            Exercice
        }
    }
</script>