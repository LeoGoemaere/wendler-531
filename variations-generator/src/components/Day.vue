<template>
    <div>
        <input class="accordion__input" type="checkbox" :id="`day-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}`"/>
        <label class="accordion__title" :for="`day-${variationName}-${templateIndex}-${weekIndex}-${dayIndex}`">
            <span>Day {{ dayIndex + 1 }}</span>
            <span class="accordion__icon-container">
                <button @click="removeDay" class="button is-small is-danger is-light"><i class="far fa-trash-alt"></i></button>
                <i class="fas fa-angle-down accordion__angle"></i>
            </span>
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
    import { mapGetters } from 'vuex';

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
        },
        methods: {
            removeDay: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const days = variations[this.variationName].templates[this.templateIndex].weeks[this.weekIndex].days;
                // At least 1 day has to be exist.
                if (days.length > 1) {
                    days.splice(this.dayIndex, 1);
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