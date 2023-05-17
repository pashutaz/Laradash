<template>
    <div>
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
                <td>
                    <DangerBtn @click="confirmingCompanyDeletion=true">
                        Delete
                    </DangerBtn>
                </td>

                <Modal :show="confirmingCompanyDeletion">
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete this company?
                        </h2>


                        <div class="mt-6 flex justify-end">
                            <SecondaryBtn @click="confirmingCompanyDeletion=false">Cancel</SecondaryBtn>

                            <DangerBtn class="ml-3" @click="destroyCompany(row.id)">
                                Yeah, why not?
                            </DangerBtn>
                        </div>
                    </div>
                </Modal>
            </template>
        </BaseTable>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import useCompanies from "@/Composables/companies";
import BaseTable from "@/Components/BaseTable.vue";
import Modal from "@/Components/Modal.vue";
import DangerBtn from "@/Components/DangerButton.vue";
import SecondaryBtn from "@/Components/SecondaryButton.vue";

const { companies, fetchCompanies, destroyCompany } = useCompanies();
const confirmingCompanyDeletion = ref(false);

onMounted(fetchCompanies);
</script>

<style scoped>
/*td button {
    @apply bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border
    border-red-500 hover:border-transparent rounded;
}*/
</style>
