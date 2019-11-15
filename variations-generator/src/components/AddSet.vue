<template>
    <div class="has-text-left margin-top">
        <button @click="addSet" class="button is-light is-info">+ New Set</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
      name: 'AddSet',
      props: {
        set: Object,
        variationName: String,
        templateIndex: Number,
        weekIndex: Number,
        dayIndex: Number,
        exerciceIndex: Number
      },
      methods: {
          setSkeleton: function() {
              return {
                reps: 0,
                tm: 0,
                pr: false
            }
          },
          addSet: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const sets = variations[this.variationName].templates[this.templateIndex].weeks[this.weekIndex].days[this.dayIndex][this.exerciceIndex].sets;
                sets.push(this.setSkeleton());
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