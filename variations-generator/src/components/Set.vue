<template>
    <div>
        <div class="set-row field-body margin">
            <div class="field has-addons">
                <div class="control">
                    <a class="button is-light">TM</a>
                </div>
                <p class="control is-expanded">
                    <input class="input" v-model.number="set.tm" type="number">
                </p>
            </div>
            <div class="field has-addons">
                <div class="control">
                    <a class="button is-light">Reps</a>
                </div>
                <p class="control is-expanded">
                    <input class="input" v-model.number="set.reps" type="number">
                </p>
            </div>
            <div class="field has-addons">
                <div class="control">
                    <button type="submit" class="button is-light">PR</button>
                </div>
                <div class="control is-expanded">
                    <div class="select" :class="{'is-success': set.pr}">
                        <select v-model="set.pr">
                            <option :value="false">false</option>
                            <option :value="true">true</option>
                        </select>
                    </div>
                </div>
            </div>
            <button @click="removeSet" class="button is-small is-danger is-light"><i class="far fa-trash-alt"></i></button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
      name: 'Set',
      props: {
        set: Object,
        variationName: String,
        templateIndex: Number,
        weekIndex: Number,
        dayIndex: Number,
        exerciceIndex: Number,
        setIndex: Number
      },
      methods: {
          removeSet: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const sets = variations[this.variationName].templates[this.templateIndex].weeks[this.weekIndex].days[this.dayIndex][this.exerciceIndex].sets;
                // At least 1 set has to be exist.
                if (sets.length > 1) {
                    sets.splice(this.setIndex, 1);
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