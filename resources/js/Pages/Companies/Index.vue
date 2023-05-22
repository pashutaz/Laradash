<script setup lang="ts">
import {onMounted, ref} from "vue";
import { Link as InertiaLink } from "@inertiajs/vue3";
import useCompanies from "@/Composables/companies";
import BaseTable from "@/Components/BaseTable.vue";
import Modal from "@/Components/Modal.vue";
import DangerBtn from "@/Components/DangerButton.vue";
import SecondaryBtn from "@/Components/SecondaryButton.vue";

const { companies, fetchCompanies, destroyCompany } = useCompanies();
const pickedCompany = ref(null);

onMounted(fetchCompanies);
</script>

<template>
    <section>
        <header class="flex justify-between">
            <h1 class="uppercase p-3 text-lg">Companies</h1>

            <InertiaLink :href="route('company.create')">
                <SecondaryBtn>
                    Create new company
                </SecondaryBtn>
            </InertiaLink>
        </header>

        <BaseTable
            :columns="[
                { name: 'Name', value: 'name' },
                { name: 'Email', value: 'email' },
                { name: 'Address', value: 'address' },
                { name: 'Website', value: 'website' }
            ]"
            :rows="companies"
        >
            <template #action="{ row }">
                <td class="text-center" role="group">
                    <InertiaLink :href="route('company.edit', { id: row.id })">
                        <SecondaryBtn class="rounded-r-none">
                           Edit
                        </SecondaryBtn>
                    </InertiaLink>
                    <DangerBtn class="rounded-l-none" @click="pickedCompany=row.id">
                        Delete
                    </DangerBtn>
                </td>
            </template>
        </BaseTable>

        <Modal :show="pickedCompany" @close="pickedCompany=null">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this company?
                </h2>

                <div class="mt-6 flex justify-end">
                    <SecondaryBtn @click="pickedCompany=null">Cancel</SecondaryBtn>

                    <DangerBtn class="ml-3" @click="destroyCompany(pickedCompany); pickedCompany=null">
                        Yeah, why not?
                    </DangerBtn>
                </div>
            </div>
        </Modal>
    </section>
</template>

<style scoped>
/*td button {
    @apply bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border
    border-red-500 hover:border-transparent rounded;
}*/
</style>
