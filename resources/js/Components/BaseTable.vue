<script setup lang="ts">
import {defineProps} from "vue";

interface IColumn {
    name: String,
    value: String
}

defineProps<{
    columns: Array<IColumn>,
    rows: Array<IColumn>
}>();
</script>

<template>
    <div id="base_table">
        <table>
            <thead>
                <tr>
                    <th scope="col" v-for="column in columns">
                        {{ column.name }}
                    </th>
                    <th v-if="$slots['action']"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows">
                    <td v-for="column in columns">
                        {{ row[column.value] }}
                    </td>
                    <slot name="action" :row="row" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
#base_table {
    @apply relative overflow-x-auto shadow-md sm:rounded-lg;
}

table {
    @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}

thead {
    @apply text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}

thead th {
    @apply px-6 py-3;
}

tbody tr {
    @apply bg-white border-b dark:bg-gray-900 dark:border-gray-700;
}

td {
    @apply px-6 py-4;
}
</style>
