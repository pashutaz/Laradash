<template>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" v-for="column in columns" class="px-6 py-3">
                    {{ column.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td v-for="column in columns" class="px-6 py-4">
                    {{ row[column.value] }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
    columns: Array,
    rows: Array
});
</script>

<style scoped>

</style>
