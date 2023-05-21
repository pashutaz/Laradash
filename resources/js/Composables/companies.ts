import {reactive, ref} from "vue";
import axios from "axios";
import {router} from '@inertiajs/vue3'

export default function useCompanies() {
    const companies = ref([]);

    const fetchCompanies = async (): Promise<any> => {
        const { data } = await axios.get('/api/company');
        companies.value = data;
        return companies;
    };

    const fetchCompany = async (id: number): Promise<object> => {
        const { data } = await axios.get(`/api/company/${id}`);
        return reactive(data);
    }

    const storeCompany = async (data: object) => {
        await axios.post('/api/company', data);
        router.visit(route('dashboard'));
    };

    const updateCompany = async (id: number, data: object) => {
        await axios.patch(`/api/company/${id}`, data);
    };

    const destroyCompany = async (id: number) => {
        await axios.delete(`/api/company/${id}`);
        await fetchCompanies();
    };

    return {
        companies,
        fetchCompanies,
        fetchCompany,
        storeCompany,
        updateCompany,
        destroyCompany
    }
}
