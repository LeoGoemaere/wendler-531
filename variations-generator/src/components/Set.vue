<template>
    <div>
        <div class="field-body margin">
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
                    <input class="input" v-model.number="set.reps" type="text">
                </p>
            </div>
            <div class="field has-addons">
                <div class="control">
                    <button type="submit" class="button is-light">PR</button>
                </div>
                <div class="control is-expanded">
                    <div class="select" :class="{'is-success': pr}">
                        <select v-model="pr">
                            <option :value="false">false</option>
                            <option :value="true">true</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="has-text-left">
            <button class="button is-text">+ Add Set</button>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Set',
      props: {
          set: Object,
          value: String,
          isLight: Boolean
      },
      data: function() {
          return {
              pr: null
          }
      },
      mounted: function() {
        if (this.set.pr) {
            this.pr = this.set.pr;
        } else {
            this.pr = false;
        }
      }
    }
</script>