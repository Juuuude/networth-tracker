<template>
    <v-container fluid>
        <v-row>
            <v-col class="text-center">
                <img src="../assets/financial_sheet_logo.png" alt="financial_sheet_logo"
                    :class="isMobileView ? 'app-logo-mobile' : 'app-logo-desktop'" />
            </v-col>
        </v-row>
        <v-col class="text-right">
            <v-btn class="fancy-button" color="blue" @click="exportData" :loading="isExportingData">
                Export<v-icon>mdi-microsoft-excel</v-icon>
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </v-col>
        <v-row>
            <v-col :cols="isMobileView ? '12' : '6'" class="ml-auto">
                <v-text-field v-model="search" label="Search" outlined placeholder="Type to search..." clearable
                    prepend-inner-icon="mdi-magnify" variant="solo"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="users" :search="search">
                    <template #item="{ item, index }">
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.userDetails.fullName }}</td>
                            <td>{{ item.userDetails.phone }}</td>
                            <td>{{ item.userDetails.email }}</td>
                            <td>{{ formatCurrency(item.totalIncome) }}</td>
                            <td>{{ formatCurrency(item.totalAssets) }}</td>
                            <td>{{ formatCurrency(item.totalExpenses) }}</td>
                            <td>{{ formatCurrency(item.totalLiabilities) }}</td>
                            <td>{{ formatCurrency(item.netWorth) }}</td>
                            <td>{{ '-' }}</td>
                            <td>
                                <v-btn icon flat size="small" @click="viewUser(item)">
                                    <v-icon>mdi-eye</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
                <v-dialog v-model="isViewingUser" width="900px">
                    <UserDetailsDialog :user="selectedUser" @close-dialog="isViewingUser = false" />
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import UserServices from '@/services/UserServices'
import * as XLSX from 'xlsx';
import type { UserData } from '../types';


const isLoading = ref(false)
const isExportingData = ref(false)
const isViewingUser = ref(false)
const search = ref('')
const isMobileView = useIsMobileView()
const users = ref<UserData[]>([])
const selectedUser = ref<UserData>()
const headers = ref([
    { title: '#', key: 'item' },
    { title: 'Full Name', key: 'userDetails.fullName' },
    { title: 'Phone', key: 'userDetails.phone' },
    { title: 'Email', key: 'userDetails.email' },
    { title: 'Total Income', key: 'totalIncome' },
    { title: 'Total Assets', key: 'totalAssets' },
    { title: 'Total Expenses', key: 'totalExpenses' },
    { title: 'Total Liabilities', key: 'totalLiabilities' },
    { title: 'Networth', key: 'netWorth' },
    { title: 'Status', key: '' },
    { title: 'Details', key: '', align: 'start' },
])

onBeforeMount(() => {
    fetchUsers()
})

const formatCurrency = (value: number) => {
    const formattedValue = Number(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedValue;
};

const viewUser = (user: UserData) => {
    selectedUser.value = user
    isViewingUser.value = true
}

const fetchUsers = async () => {
    try {
        isLoading.value = true
        const res = await UserServices.fetchUsers()
        const allUsers = []
        for (const key in res.data) {
            const user = {
                id: key,
                totalIncome: res.data[key].totalIncome,
                totalAssets: res.data[key].totalAssets,
                totalExpenses: res.data[key].totalExpenses,
                totalLiabilities: res.data[key].totalLiabilities,
                netWorth: res.data[key].netWorth,
                userDetails: res.data[key].user,
                income: res.data[key].income,
                assets: res.data[key].assets,
                expenses: res.data[key].expenses,
                liabilities: res.data[key].liabilities,
                notes: res.data[key].notes
            }
            allUsers.push(user)
        }
        users.value = JSON.parse(JSON.stringify(allUsers))
    } catch (error) {
        console.error('Error fetching users, please try again')
    } finally {
        isLoading.value = false
    }
}

const exportData = () => {
    isExportingData.value = true
    const filteredUsers = users.value.map(({ id, userDetails, ...rest }) => ({
        'Full Name': userDetails.fullName,
        'Phone': userDetails.phone,
        'Email': userDetails.email,
        'Total Income': rest.totalIncome,
        'Total Assets': rest.totalAssets,
        'Total Expenses': rest.totalExpenses,
        'Total Liabilities': rest.totalLiabilities,
        'Networth': rest.netWorth
    }));
    // Create a worksheet with the filtered data
    const ws = XLSX.utils.json_to_sheet(filteredUsers);

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'financial_sheet.xlsx');
    isExportingData.value = false
};

</script>
  
<style scoped>

.app-logo-desktop {
    width: 380px;
}

.app-logo-mobile {
    width: 250px;
}

.button-text {
    text-transform: none;
}

.fancy-button {
    background-color: #217346;
    /* Custom color for the button */
    color: #ffffff;
    /* Text color for the button */
    border-radius: 8px;
    /* Add some border-radius for a rounded look */
    text-transform: none;
    transition: background-color 0.3s;
    /* Smooth transition for background color */
}

.fancy-button:hover {
    background-color: #165c2b;
    /* Change background color on hover */
}

.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
html, body {
  height: 100%;
  margin: 0;
}
</style>
  