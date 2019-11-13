<template>
    <div>
        <input class="accordion__input" type="checkbox" id="day-1"/>
        <label class="accordion__title" for="day-1">
            <span>Day 1</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <Set />
        </div>
    </div>
</template>

<script>
    import Set from '@/components/Set.vue';

    export default {
        name: 'Week',
        props: {
            name: String
        },
        components: {
            Set
        },
        data: function() {
            return {
                value: null
            }
        },
        computed: {
            dayName: function() {
                if (this.value) {
                    return this.value;
                } else if (this.name) {
                    return this.name;
                } else {
                    return 'Day Name'
                }
            }
        }
    }
</script>