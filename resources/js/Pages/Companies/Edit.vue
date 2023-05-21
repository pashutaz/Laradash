<script setup lang="ts">
import {defineProps, onMounted, reactive, ref} from "vue";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useCompanies from "@/Composables/companies";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {AxiosError} from "axios";

const props = defineProps({
    companyId: String
});

let processing = ref(false);
let successful = ref(false);

const errors = ref([]);
const form = reactive({
    name: null,
    address: null,
    email: null,
    website: null
})

const { fetchCompany, updateCompany } = useCompanies();

const fetch = async () => {
    processing.value = true;

    try {
        const company = await fetchCompany(Number(props.companyId));

        Object.assign(form, {...company});

        successful.value = true;
    }
    catch (e) {
        successful.value = false;
        errors.value = e.response?.data['errors'];
    }
    finally {
        processing.value = false;
    }
};
const submit = async () => {
    processing.value = true;

    try {
        await updateCompany(Number(props.companyId), form);
        successful.value = true;
    }
    catch (e: AxiosError<Array<any>>) {
        successful.value = false;
        errors.value = e.response.data['errors'];
    }
    finally {
        processing.value = false;
    }
}

onMounted(fetch);
</script>

<template>
    <Head><title>Edit company</title></Head>

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Edit company
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg px-4">
                    <form @submit.prevent="submit" class="mt-6 space-y-6">
                        <div>
                            <InputLabel for="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.name"
                                autocomplete="name"
                                autofocus
                                required
                            />

                            <InputError class="mt-2" :message="errors['name']" />
                        </div>

                        <div>
                            <InputLabel for="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                class="mt-1 block w-full"
                                v-model="form.email"
                                autocomplete="email"
                                required
                            />

                            <InputError class="mt-2" :message="errors['email']" />
                        </div>

                        <div>
                            <InputLabel for="website" value="Website" />

                            <TextInput
                                id="website"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.website"
                                autocomplete="username"
                                required
                            />

                            <InputError class="mt-2" :message="errors['website']" />
                        </div>

                        <div>
                            <InputLabel for="address" value="Address" />

                            <TextInput
                                id="address"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.address"
                                autocomplete="address"
                                required
                            />

                            <InputError class="mt-2" :message="errors['address']" />
                        </div>

                        <div class="flex items-center gap-4 pb-5">
                            <PrimaryButton :disabled="processing">Save</PrimaryButton>

                            <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                                <p v-if="successful" class="text-sm text-green-600 dark:text-green-400">
                                    Saved
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
