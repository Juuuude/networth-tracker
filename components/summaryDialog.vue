<template>
    <v-card class="summary-card" elevation="0">
        <v-row>
            <v-alert v-if="hasError" density="compact" type="error" title="Network Error"
                text="Network error, please try again later">
            </v-alert>
            <v-col class="text-center" cols="12">
                <h2 class="headline">Financial Summary</h2>
            </v-col>
        </v-row>
        <div class="scrollable-content">
            <section>
                <h3 class="subtitle-1">Income</h3>
                <div v-for="(income, i) in summary.income" :key="i" class="summary-item">
                    <span>{{ income.incomeLabel }}:</span>
                    <span class="value">{{ formatCurrency(income.incomeValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Income:</b></span>
                    <span class="total-value">{{ formatCurrency(summary.totalIncome) }}</span>
                </div>
                <br />
            </section>
            <hr>
            <br />
            <section>
                <h3 class="subtitle-1">Assets</h3>
                <div v-for="(asset, i) in summary.assets" :key="i" class="summary-item">
                    <span>{{ asset.assetLabel }}:</span>
                    <span class="value">{{ formatCurrency(asset.assetValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Assets:</b></span>
                    <span class="total-value">{{ formatCurrency(summary.totalAssets) }}</span>
                </div>
                <br />
            </section>
            <hr>
            <br />
            <section>
                <h3 class="subtitle-1">Expenses</h3>
                <div v-for="(expense, i) in summary.expenses" :key="i" class="summary-item">
                    <span>{{ expense.expenseLabel }}:</span>
                    <span class="value">{{ formatCurrency(expense.expenseValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Expenses:</b></span>
                    <span class="total-value">{{ formatCurrency(summary.totalExpenses) }}</span>
                </div>
                <br />
            </section>
            <hr>
            <br />
            <section>
                <h3 class="subtitle-1">Liabilities</h3>
                <div v-for="(liability, i) in summary.liabilities" :key="i" class="summary-item">
                    <span>{{ liability.liabilityLabel }}:</span>
                    <span class="value">{{ formatCurrency(liability.liabilityValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Liabilities:</b></span>
                    <span class="total-value">{{ formatCurrency(summary.totalLiabilities) }}</span>
                </div>
            </section>

            <hr class="divider" />

            <div class="total-networth-section">
                <h4 class="subtitle-1">Total Networth:</h4>
                <span class="total-value">{{ formatCurrency(summary.netWorth) }}</span>
            </div>
        </div>
        <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn color="indigo-darken-3" class="text-none" flat size="large" @click="closeDialog">Cancel</v-btn>
            <v-btn color="indigo-darken-3" class="text-none" flat size="large"
                @click="showEnterDetailsDialog = true">Submit</v-btn>
        </v-card-actions>
        <v-dialog v-model="showEnterDetailsDialog" width="500px" persistent transition="dialog-top-transition">
            <enterDetailsDialog @closeEnterDetailsDialog="showEnterDetailsDialog = false" @submitForm="submit" />
        </v-dialog>
    </v-card>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '@/types';
import UserServices from '@/services/UserServices'

const props = defineProps(['summary']);
const emit = defineEmits(['closeDialog', 'submit']);
const showEnterDetailsDialog = ref(false);
const hasError = ref(false);

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change currency code as needed
        minimumFractionDigits: 2, // Adjust the number of decimal places
    }).format(value);
};
const submit = async (user: User) => {
    props.summary.user = user;
    // Set the time zone to 'America/Denver'
    const options = { timeZone: 'America/Denver' };
    props.summary.timestamp = new Date().toLocaleString('en-US', options);
    try {
        const res = await UserServices.addNewUser(props.summary);
        if (res.status === 200) emit('submit')
    } catch (error) {
        hasError.value = true
    }
}
const closeDialog = () => {
    emit('closeDialog')
}
</script>
  
<style scoped>
.summary-card {
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
}

.scrollable-content {
    max-height: 400px;
    overflow-y: auto;
}

.subtitle-1 {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    /* Increased margin for better separation */
}

.total-section {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}

.total-networth-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
}

.total-value {
    font-weight: bold;
    white-space: nowrap;
    /* Prevent line breaks for long numbers */
}

.divider {
    margin: 16px 0;
    border: 0;
    border-top: 1px solid #ccc;
}

.button-text {
    text-transform: none;
}
</style>
  