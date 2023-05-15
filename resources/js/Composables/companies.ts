import {ref} from "vue";
import axios from "axios";

export default function useCompanies() {
    const companies = ref([]);

    const fetchCompanies = async () => {
        const { data } = await axios.get('/api/company');
        companies.value = data;
        return companies;
    };

    return {
        companies,
        fetchCompanies
    }
}
