<template>
	<div class="accordion">
        <Program />
    </div>
</template>

<script>

    import Program from '@/components/Program.vue';

    export default {
        name: 'Variation',
        props: {
            program: String,
            placeholder: String
        },
        components: {
            Program
        },
        data: function() {
            return {
                programNaming: null,
                templateNaming: null
            }
        },
        computed: {
            programName: function() {
                if (this.programNaming) {
                    return this.programNaming;
                } else if (this.program) {
                    return this.program;
                } else {
                    return 'Program Name'
                }
            },
            templateName: function() {
                if (this.templateNaming) {
                    return this.templateNaming;
                } else {
                    return 'Template Name'
                }
            }
        }
    }
</script>