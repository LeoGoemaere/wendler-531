<template>
    <div>
        <input class="accordion__input" type="checkbox" id="week-1"/>
        <label class="accordion__title" for="week-1">
            <span>{{ weekName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="value" class="input" type="text" placeholder="Name">

            <Day />

        </div>
    </div>
</template>

<script>
    import Day from '@/components/Day.vue';

    export default {
        name: 'Week',
        props: {
            name: String
        },
        components: {
            Day
        },
        data: function() {
            return {
                value: null
            }
        },
        computed: {
            weekName: function() {
                if (this.value) {
                    return this.value;
                } else if (this.name) {
                    return this.name;
                } else {
                    return 'Week Name'
                }
            }
        }
    }
</script>