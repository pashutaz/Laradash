<template>
    <div>
        <BaseTable
            :columns="[
                { name: 'Name', value: 'name' },
                { name: 'Address', value: 'address' }
            ]"
            :rows="companies"
        />
    </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import useCompanies from "@/Composables/companies";
import BaseTable from "@/Components/BaseTable.vue";

const { companies, fetchCompanies } = useCompanies();

onMounted(fetchCompanies);
</script>

<style scoped></style>
