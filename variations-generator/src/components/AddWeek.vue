<template>
    <div class="has-text-left margin-top">
        <button @click="addWeek" class="button is-light is-info">+ New Week</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'AddWeek',
        props: {
            week: Object,
            variationName: String,
            templateIndex: Number
        },
        components: {
        },
        methods: {
            weekSkeleton: function() {
                return {
                    name: '',
                    days: [
                        [
                            {
                                sets: [
                                    {
                                        reps: 0,
                                        tm: 0,
                                        pr: false
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                sets: [
                                    {
                                        reps: 0,
                                        tm: 0,
                                        pr: false
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                sets: [
                                    {
                                        reps: 0,
                                        tm: 0,
                                        pr: false
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                sets: [
                                    {
                                        reps: 0,
                                        tm: 0,
                                        pr: false
                                    }
                                ]
                            }
                        ]
                    ]
                }
            },
            addWeek: function() {
                const variations = JSON.parse(JSON.stringify(this.getVariations));
                const weeks = variations[this.variationName].templates[this.templateIndex].weeks;
                weeks.push(this.weekSkeleton());
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