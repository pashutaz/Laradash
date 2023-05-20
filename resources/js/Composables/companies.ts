import {ref} from "vue";
import axios from "axios";
import { router } from '@inertiajs/vue3'

export default function useCompanies() {
    const companies = ref([]);

    const fetchCompanies = async () => {
        const { data } = await axios.get('/api/company');
        companies.value = data;
        return companies;
    };

    const storeCompany = async (data: object) => {
        await axios.post('/api/company', data);
        router.visit(route('dashboard'));
    };

    const destroyCompany = async (id: number) => {
        await axios.delete(`/api/company/${id}`);
        await fetchCompanies();
    };

    return {
        companies,
        fetchCompanies,
        storeCompany,
        destroyCompany
    }
}
