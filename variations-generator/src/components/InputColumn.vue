<template>
    <div>
        <div class="field-body margin">
            <div class="field has-addons">
                <div class="control">
                    <a class="button is-light">RM</a>
                </div>
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="0.65">
                </p>
            </div>
            <div class="field has-addons">
                <div class="control">
                    <a class="button is-light">Reps</a>
                </div>
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="10">
                </p>
            </div>
            <div class="field has-addons">
                <div class="control">
                    <button type="submit" class="button is-light">Personal Record</button>
                </div>
                <div class="control is-expanded">
                    <div class="select">
                    <select name="">
                        <option value="false">false</option>
                        <option value="true">true</option>
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
      name: 'InputColumn',
      props: {
          value: String,
          isLight: Boolean
      }
    }
</script>