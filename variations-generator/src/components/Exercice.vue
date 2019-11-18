<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`exercice-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}-${exerciceIndex}`"/>
        <label class="accordion__title accordion__title--quinary" :for="`exercice-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}-${exerciceIndex}`">
            <span>Exercice {{ exerciceIndex + 1 }}</span>
            <span class="accordion__icon-container">
                <button @click="removeExercice" class="button is-small is-danger is-light"><i class="far fa-trash-alt"></i></button>
                <i class="fas fa-angle-down accordion__angle"></i>
            </span>
        </label>
        <div class="accordion__content">
            <AddSet
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="weekIndex"
                :dayIndex="dayIndex"
                :exerciceIndex="exerciceIndex"
            />
            <Set
                v-for="(set, index) in exercice.sets"
                :key="set.id"
                :set="set"
                :variationName="variationName"
                :templateIndex="templateIndex"
                :weekIndex="weekIndex"
                :dayIndex="dayIndex"
                :exerciceIndex="exerciceIndex"
                :setIndex="index"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Set from '@/components/Set.vue';
    import AddSet from '@/components/AddSet.vue';

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
            Set,
            AddSet
        },
        methods: {
            removeExercice: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const exercices = variations[this.variationName].templates[this.templateIndex].weeks[this.weekIndex].days[this.dayIndex];
                // At least 1 exercice has to be exist.
                if (exercices.length > 1) {
                    exercices.splice(this.exerciceIndex, 1);
                    this.$store.commit('updateVariations', variations);
                }
            }
        },
        computed: {
            ...mapGetters([
                'getVariations'
            ])
        }
    }
</script>