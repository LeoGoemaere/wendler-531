<template>
    <div>
        <input class="accordion__input" type="checkbox" id="accordion-1"/>
        <label class="accordion__title has-text-weight-bold" for="accordion-1">
            <span>{{ programName }}</span>
            <i class="fas fa-angle-down accordion__icon"></i>
        </label>
        <div class="accordion__content">
            <input v-model="value" class="input" type="text" placeholder="Name">

            <Template />
        </div>
    </div>
</template>

<script>
    import Template from '@/components/Template.vue';

    export default {
        name: 'Program',
        props: {
            name: String
        },
        components: {
            Template
        },
        data: function() {
            return {
                value: null
            }
        },
        computed: {
            programName: function() {
                if (this.value) {
                    return this.value;
                } else if (this.name) {
                    return this.name;
                } else {
                    return 'Program Name'
                }
            }
        }
    }
</script>