<template>
    <div class="has-text-left margin-top">
        <button @click="addExercice" class="button is-light is-info">+ New Exercice</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'AddExercice',
        props: {
            exercice: Object,
            variationName: String,
            templateIndex: Number,
            weekIndex: Number,
            dayIndex: Number
        },
        components: {
        },
        methods: {
            exercicesSkeleton: function() {
                return {
                    sets: [
                        {
                            reps: 0,
                            tm: 0,
                            pr: false
                        }
                    ]
                }
            },
            addExercice: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const exercices = variations[this.variationName].templates[this.templateIndex].weeks[this.weekIndex].days[this.dayIndex];
                exercices.push(this.exercicesSkeleton());
                this.$store.commit('updateVariations', variations);
            }
        },
        computed: {
            ...mapGetters([
                'getVariations'
            ])
        }
    }
</script>