<template>
  <v-container fluid class="container">
    <v-row>
      <v-col class="text-right">
        <v-btn @click="showLogin" color="primary button-text">Admin</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <img src="../assets/financial_sheet_logo.png" alt="financial_sheet_logo"
          :class="isMobileView ? 'app-logo-mobile' : 'app-logo-desktop'">
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <!-- Income Card -->
        <v-card class="form-card" :class="isMobileView ? '' : 'mx-10'">
          <p class="sub-title" style="padding: 10px; background-color: rgb(31, 41, 20); color: #FFF;">Income</p>
          <v-card-text>
            <v-row class="scrollable-container">
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" v-for="(item, index) in incomeTextFields" :key="index">
                <v-text-field v-model="item.value" :label="item.label" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-btn class="ml-4 mb-3 button-text" color="#28B421" variant="flat" @click="addIncomeField">
            Add more <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-text-field class="total-field mx-2" type="number" v-model="totalIncome" label="Total Income"
            readonly></v-text-field>
        </v-card>

      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">

        <!-- Assets Card -->
        <v-card class="form-card" :class="isMobileView ? '' : 'mx-10'">
          <p class="sub-title" style="padding: 10px; background-color: rgb(31, 41, 20); color: #FFF;">Assets</p>
          <v-card-text>
            <v-row class="scrollable-container">
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" v-for="(item, index) in assetsTextFields" :key="index">
                <v-text-field v-model="item.value" :label="item.label" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-btn class="ml-4 mb-3 button-text" color="#28B421" variant="flat" @click="addAssetField">
            Add more <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-text-field class="total-field mx-2" type="number" v-model="totalAssets" label="Total Assets"
            readonly></v-text-field>
        </v-card>

      </v-col>
    </v-row>

    <!-- Expenses and Liabilities Section -->
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">

        <!-- Expenses Card -->
        <v-card class="form-card" :class="isMobileView ? '' : 'mx-10'">
          <p class="sub-title" style="padding: 10px; background-color: rgb(31, 41, 20); color: #FFF;">Expenses</p>
          <v-card-text>
            <v-row class="scrollable-container">
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" v-for="(item, index) in expenseTextFields" :key="index">
                <v-text-field v-model="item.value" :label="item.label" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-btn class="ml-4 mb-3 button-text" color="#28B421" variant="flat" @click="addExpenseField">
            Add more <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-text-field class="total-field mx-2" type="number" v-model="totalExpenses" label="Total Expenses"
            readonly></v-text-field>
        </v-card>

      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6">

        <!-- Liabilities Card -->
        <v-card class="form-card" :class="isMobileView ? '' : 'mx-10'">
          <p class="sub-title" style="padding: 10px; background-color: rgb(31, 41, 20); color: #FFF;">Liabilities</p>
          <v-card-text>
            <v-row class="scrollable-container">
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" v-for="(item, index) in liablitiesTextFields" :key="index">
                <v-text-field v-model="item.value" :label="item.label" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-btn class="ml-4 mb-3 button-text" color="#28B421" variant="flat" @click="addLiabilityField">
            Add more <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-text-field class="total-field mx-2" type="number" v-model="totalLiabilities" label="Total Liabilities"
            readonly></v-text-field>
        </v-card>

      </v-col>
    </v-row>

    <!-- Net Worth Section -->
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <div :class="isMobileView ? '' : 'mx-10'">
          <v-text-field type="number" variant="solo" v-model="netWorth" label="Total Networth" readonly></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <div :class="isMobileView ? '' : 'mx-10'">
          <v-btn block class="text-none" color="indigo-darken-3" size="x-large" variant="flat" @click="submitForm">
            Check and Review
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="isViewingSummary" width="800px">
      <summaryDialog :summary="summary" @close-dialog="isViewingSummary = false" @submit="handleSubmit" />
    </v-dialog>
    <v-dialog v-model="showAlert" max-width="500px" persistent transition="dialog-top-transition">
      <v-alert type="success" focus title="Thank you" text="Details successfully submitted!"></v-alert>
    </v-dialog>
    <v-dialog v-model="showLoginDialog" width="500px" transition="dialog-top-transition">
      <loginDialog />
    </v-dialog>
  </v-container>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from "../store/pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();
const isMobileView = useIsMobileView();
const showAlert = ref(false);
const isViewingSummary = ref(false);
const showLoginDialog = ref(false);


// income data and functions
const incomeTextFields = ref([
  { label: 'Job', value: 0 },
  { label: 'Self-Employment', value: 0 },
  { label: 'Real Estate (Net)', value: 0 },
  { label: 'Business (Net)', value: 0 },
  { label: 'Interest', value: 0 },
  { label: 'Dividends', value: 0 },
  { label: 'Royalties', value: 0 }
])

const isLoggedIn = computed(() => appStore.isLoggedIn)

const showLogin = () => {
  if (isLoggedIn.value) {
    router.push('/admin')
  } else {
    showLoginDialog.value = true;
  }
};

const addIncomeField = () => {
  const label = window.prompt('Enter the label for the new income field:');
  if (label) {
    incomeTextFields.value.push({ label, value: 0 });
  }
};

const totalIncome = computed(() => {
  const incomes = incomeTextFields.value.map(item => parseFloat(item.value.toString()) || 0);
  return incomes.reduce((sum, income) => sum + income, 0).toFixed(2);
});


// assets data and fucntions 
const assetsTextFields = ref([
  { label: 'Bank Accounts', value: 0 },
  { label: 'Stocks', value: 0 },
  { label: 'Partnership', value: 0 },
  { label: 'Real State Assets', value: 0 }
])

const addAssetField = () => {
  const label = window.prompt('Enter the label for the new asset field:');
  if (label) {
    assetsTextFields.value.push({ label, value: 0 });
  }
};

const totalAssets = computed(() => {
  const assets = assetsTextFields.value.map(item => parseFloat(item.value.toString()) || 0);
  return assets.reduce((sum, asset) => sum + asset, 0).toFixed(2);
});


// expense data and functions
const expenseTextFields = ref([
  { label: 'Cash', value: 0 },
  { label: 'Support', value: 0 }
])

const addExpenseField = () => {
  const label = window.prompt('Enter the label for the new expense field:');
  if (label) {
    expenseTextFields.value.push({ label, value: 0 });
  }
};

const totalExpenses = computed(() => {
  const expenses = expenseTextFields.value.map(item => parseFloat(item.value.toString()) || 0);
  return expenses.reduce((sum, expense) => sum + expense, 0).toFixed(2);
});


// liabilities data and functions
const liablitiesTextFields = ref([
  { label: 'Credit Cards', value: 0 },
  { label: 'Home Mortgage Loan', value: 0 },
  { label: 'Loans', value: 0 }
])

const addLiabilityField = () => {
  const label = window.prompt('Enter the label for the new liability field:');
  if (label) {
    liablitiesTextFields.value.push({ label, value: 0 });
  }
};

const totalLiabilities = computed(() => {
  const liabilities = liablitiesTextFields.value.map(item => parseFloat(item.value.toString()) || 0);
  return liabilities.reduce((sum, liability) => sum + liability, 0).toFixed(2);
});


// networth calculations
const netWorth = computed(() => {
  const totalIncomeValue = parseFloat(totalIncome.value) || 0;
  const assetsSubtotalValue = parseFloat(totalAssets.value) || 0;
  const totalExpensesValue = parseFloat(totalExpenses.value) || 0;
  const totalLiabilitiesValue = parseFloat(totalLiabilities.value) || 0;

  // calculate net worth: Income + Assets - Expenses - Liabilities
  const netWorthValue = totalIncomeValue + assetsSubtotalValue - totalExpensesValue - totalLiabilitiesValue;

  // convert the result to a number with 2 decimal places
  return isNaN(netWorthValue) ? 0 : parseFloat(netWorthValue.toFixed(2));
});


const summary = ref({});
const submitForm = () => {
  summary.value = {
    income: incomeTextFields.value.map(income => ({
      incomeLabel: income.label,
      incomeValue: income.value
    })),
    totalIncome: totalIncome.value,
    assets: assetsTextFields.value.map(asset => ({
      assetLabel: asset.label,
      assetValue: asset.value
    })),
    totalAssets: totalAssets.value,
    expenses: expenseTextFields.value.map(expense => ({
      expenseLabel: expense.label,
      expenseValue: expense.value
    })),
    totalExpenses: totalExpenses.value,
    liabilities: liablitiesTextFields.value.map(liability => ({
      liabilityLabel: liability.label,
      liabilityValue: liability.value
    })),
    totalLiabilities: totalLiabilities.value,
    netWorth: netWorth.value,
  };
  isViewingSummary.value = true;

};

const handleSubmit = () => {
  showAlert.value = true;
  isViewingSummary.value = false;
  setTimeout(() => {
    showAlert.value = false
  }, 3000);
}

</script>
    
<style>
.form-card {
  height: 600px;
  opacity: 0.85;
}

.sub-title {
  font-weight: bold;
  font-size: 25px;
}

.scrollable-container {
  overflow-y: auto;
}

.scrollable-container {
  max-height: 400px;
  overflow-y: auto;
}

.app-logo-desktop {
  width: 600px;
}

.app-logo-mobile {
  width: 300px;
}


html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  background-image: url('../assets/financial_sheet_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.button-text {
  text-transform: none;
}
</style>
    