<template>
    <button @click="exportToJson" class="button is-primary export-button">Export Variations</button>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ExportToJson',
        methods: {
            exportToJson: function() {
                const exportFile = new Blob([JSON.stringify(this.getVariations, null, 2)], {type : 'application/json'});
                const url = URL.createObjectURL(exportFile);
                const aTag = document.createElement('a');
                aTag.download = 'variations.json';
                aTag.href = url;
                aTag.click();
                URL.revokeObjectURL(url);
            }
        },
        computed: {
            ...mapGetters([
                'getVariations'
            ])
        }
    }
</script>