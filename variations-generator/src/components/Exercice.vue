<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`exercice-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}-${exerciceIndex}`"/>
        <label class="accordion__title" :for="`exercice-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}-${exerciceIndex}`">
            <span>Exercice {{ exerciceIndex + 1 }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <Set
                v-for="set in exercice.sets"
                :set="set"
            />
        </div>
    </div>
</template>

<script>
    import Set from '@/components/Set.vue';

    export default {
        name: 'Exercice',
        props: {
            exercice: Object,
            variationName: String,
            templateIndex: Number,
            weekIndex: Number,
            dayIndex: Number,
            exerciceIndex: Number
        },
        components: {
            Set
        }
    }
</script>