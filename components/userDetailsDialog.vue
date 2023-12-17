<template>
    <v-card class="summary-card" elevation="0">
        <v-row>
            <v-col class="text-center" cols="12">
                <h2 class="headline">User Details</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"><b>
                    <p>Full Name: {{ user.userDetails.fullName }}</p>
                </b></v-col>
            <v-col cols="4"><b>
                    <p>Phone: {{ user.userDetails.phone }}</p>
                </b></v-col>
            <v-col cols="4"><b>
                    <p>Email: <a :href="'mailto:' + user.userDetails.email">{{ user.userDetails.email }}</a> </p>
                </b></v-col>
            <v-col>
                <p><b>Status: </b></p>
            </v-col>
        </v-row>
        <br>
        <hr />
        <div class="scrollable-content">
            <section>
                <h3 class="subtitle-1">Income</h3>
                <div v-for="(income, i) in user.income" :key="i" class="summary-item">
                    <span>{{ income.incomeLabel }}:</span>
                    <span class="value">{{ formatCurrency(income.incomeValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Income:</b></span>
                    <span class="total-value">{{ formatCurrency(user.totalIncome) }}</span>
                </div>
                <br />
            </section>
            <hr>
            <br />
            <section>
                <h3 class="subtitle-1">Assets</h3>
                <div v-for="(asset, i) in user.assets" :key="i" class="summary-item">
                    <span>{{ asset.assetLabel }}:</span>
                    <span class="value">{{ formatCurrency(asset.assetValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Assets:</b></span>
                    <span class="total-value">{{ formatCurrency(user.totalAssets) }}</span>
                </div>
                <br />
            </section>
            <hr>
            <br />
            <section>
                <h3 class="subtitle-1">Expenses</h3>
                <div v-for="(expense, i) in user.expenses" :key="i" class="summary-item">
                    <span>{{ expense.expenseLabel }}:</span>
                    <span class="value">{{ formatCurrency(expense.expenseValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Expenses:</b></span>
                    <span class="total-value">{{ formatCurrency(user.totalExpenses) }}</span>
                </div>
                <br />
            </section>
            <hr>
            <br />
            <section>
                <h3 class="subtitle-1">Liabilities</h3>
                <div v-for="(liability, i) in user.liabilities" :key="i" class="summary-item">
                    <span>{{ liability.liabilityLabel }}:</span>
                    <span class="value">{{ formatCurrency(liability.liabilityValue) }}</span>
                </div>
                <div class="total-section mt-5">
                    <span><b>Total Liabilities:</b></span>
                    <span class="total-value">{{ formatCurrency(user.totalLiabilities) }}</span>
                </div>
            </section>

            <hr class="divider" />

            <div class="total-networth-section">
                <h4 class="subtitle-1">Total Networth:</h4>
                <span class="total-value">{{ formatCurrency(user.netWorth) }}</span>
            </div>
            <hr class="divider" />
            <div>
                <h4 class="subtitle-1">Notes:</h4>
                <div v-if="!showNotes && !notes">
                    <v-btn class="mb-3 button-text" color="#28B421" variant="flat" @click="showAddNotes">
                        Add Notes <v-icon>mdi-plus</v-icon> </v-btn>
                </div>
                <div v-else>
                    <v-alert :type="alertType" focus v-model="showAlert" :text="alertMessage" closable></v-alert>
                    <v-textarea v-model="notes" placeholder="Enter your notes here..."></v-textarea>
                </div>
            </div>
        </div>
        <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn color="indigo-darken-3" class="text-none" flat size="large" @click="closeDialog">Close</v-btn>
            <v-btn color="indigo-darken-3" class="text-none" flat size="large" @click="save"
                :disabled="disabled">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import UserServices from '@/services/UserServices'

const props = defineProps(['user']);
const emit = defineEmits(['closeDialog', 'submit']);
const showNotes = ref(false);
const showAlert = ref(false);
const notes = ref(props.user.notes || '');
const alertMessage = ref('');
const alertType = ref<'success' | 'error' | 'warning' | 'info'>('success');
const disabled = ref(false);

// watch(() => notes.value, (newVal, oldVal) => {
//     disabled.value = newVal === oldVal;
// }, { immediate: true });

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change currency code as needed
        minimumFractionDigits: 2, // Adjust the number of decimal places
    }).format(value);
};
const save = async () => {
    try {
        const res = await UserServices.updateUser(notes.value, props.user.id);
        if (res.status === 200) {
            props.user.notes = res.data.notes
            showAlert.value = true
            setTimeout(() => {
                showAlert.value = false
            }, 3000);
            alertMessage.value = 'User updated successfully!'
            alertType.value = 'success'
        }
    } catch (error) {
        showAlert.value = true
        setTimeout(() => {
            showAlert.value = false
        }, 3000);
        alertMessage.value = 'Unable to update user, please try again later'
        alertType.value = 'error'
    }
}
const showAddNotes = () => {
    showNotes.value = true
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
    font-family: 'Roboto', sans-serif;
}

.scrollable-content {
    max-height: 400px;
    overflow-y: auto;
}

.subtitle-1 {
    font-size: 1.4rem;
    margin-bottom: 8px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
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
  