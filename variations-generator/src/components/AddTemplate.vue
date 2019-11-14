<template>
    <div class="has-text-left">
        <button @click="addTemplate" class="button is-link is-outlined">+ New Template</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'AddTemplate',
        props: {
            template: Object,
            templateIndex: Number,
            variationName: String
        },
        components: {
        },
        methods: {
            templateSkeleton: function() {
                return {
                    name:  '',
                    description: '',
                    weeks: [
                        {
                            name: '',
                            days: [
                                [
                                    {
                                        sets: [
                                            {
                                                reps: 0,
                                                tm: 0
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    ]
                }
            },
            addTemplate: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const templates = variations[this.variationName].templates;
                templates.push(this.templateSkeleton());
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