<template>
  <title>Financial Playbook</title>
  <VitePwaManifest />
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
              <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                <v-select v-model="selectedIncomeCategory" :items="availableIncomeCategories" label="Add Income Category"
                  @update:modelValue="handleIncomeCategoryChange" style="color: #28B421; font-weight: bold;"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
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
              <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                <v-select v-model="selectedAssetCategory" :items="availableAssetCategories" label="Add Asset Category"
                  @update:modelValue="handleAssetCategoryChange" style="color: #28B421; font-weight: bold;"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
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
              <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                <v-select v-model="selectedExpenseCategory" :items="availableExpenseCategories"
                  label="Add Expense Category" @update:modelValue="handleExpenseCategoryChange"
                  style="color: #28B421; font-weight: bold;"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
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
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" v-for="(item, index) in liabilitiesTextFields" :key="index">
                <v-text-field v-model="item.value" :label="item.label" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                <v-select v-model="selectedLiabilityCategory" :items="availableLiabilityCategories"
                  label="Add Liability Category" @update:modelValue="handleLiabilityCategoryChange"
                  style="color: #28B421; font-weight: bold;"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
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
    <v-dialog v-model="isViewingSummary" width="100%" max-width="800px">
      <summaryDialog :summary="summary" @close-dialog="isViewingSummary = false" @submit="handleSubmit" />
    </v-dialog>
    <v-dialog v-model="showAlert" max-width="500px" persistent transition="dialog-top-transition">
      <v-alert type="success" focus title="Thank you" text="Details successfully submitted!"></v-alert>
    </v-dialog>
    <v-dialog v-model="showLoginDialog" width="100%" max-width="500px" transition="dialog-top-transition">
      <loginDialog />
    </v-dialog>
  </v-container>
</template>
    
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from "../store/pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();
const isMobileView = useIsMobileView();
const showAlert = ref(false);
const isViewingSummary = ref(false);
const showLoginDialog = ref(false);

const isLoggedIn = computed(() => appStore.isLoggedIn)

const showLogin = () => {
  if (isLoggedIn.value) {
    router.push('/admin')
  } else {
    showLoginDialog.value = true;
  }
};

// income data and functions
const incomeTextFields = ref([
  { label: 'Earned Job #1', value: 0 },
  { label: 'Self-Employment', value: 0 },
  { label: 'Real Estate (Net)', value: 0 },
  { label: 'Business (Net)', value: 0 },
])

const selectedIncomeCategory = ref('');
const incomeCategories = [
  'Interest',
  'Dividends',
  'Royalties',
  'Earned Job #2',
  'Add Others'
];

// Remove the chosen category to the choices
const availableIncomeCategories = computed(() => {
  const chosenCategories = incomeTextFields.value.map(item => item.label);
  return incomeCategories.filter(category => !chosenCategories.includes(category));
});

const handleIncomeCategoryChange = () => {
  if (selectedIncomeCategory.value === 'Add Others') {
    // Prompt for a new income label
    const label = window.prompt('Enter the label for the new income field:');
    if (label) {
      incomeTextFields.value.push({ label, value: 0 });
    }
  } else {
    // Add the selected category to the income fields
    incomeTextFields.value.push({ label: selectedIncomeCategory.value, value: 0 });
  }
  // Clear the selected category
  selectedIncomeCategory.value = '';
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

const selectedAssetCategory = ref('');
const assetCategories = [
  'Bonds',
  'Receivables',
  'Home',
  'Car(s)',
  'Add Others'
];

// Remove the chosen category to the choices
const availableAssetCategories = computed(() => {
  const chosenCategories = assetsTextFields.value.map(item => item.label);
  return assetCategories.filter(category => !chosenCategories.includes(category));
});

const handleAssetCategoryChange = () => {
  if (selectedAssetCategory.value === 'Add Others') {
    // Prompt for a new asset label
    const label = window.prompt('Enter the label for the new asset field:');
    if (label) {
      assetsTextFields.value.push({ label, value: 0 });
    }
  } else {
    // Add the selected category to the asset fields
    assetsTextFields.value.push({ label: selectedAssetCategory.value, value: 0 });
  }
  // Clear the selected category
  selectedAssetCategory.value = '';
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
const selectedExpenseCategory = ref('');
const expenseCategories = [
  'Taxes (Income)',
  'Health Insurance',
  'Home Mortgage (or Rent)',
  'Utilites electric, gas, water',
  'Cell Phone',
  'Home Insurance',
  'Food and Clothing',
  'Credit Card #1',
  'Credit Card #2',
  'Credit Card #3',
  'Car Loan #1',
  'School Loan #1',
  'Car Insurance',
  'Add Others',
];

// Remove the chosen category to the choices
const availableExpenseCategories = computed(() => {
  const chosenCategories = expenseTextFields.value.map(item => item.label);
  return expenseCategories.filter(category => !chosenCategories.includes(category));
});

const handleExpenseCategoryChange = () => {
  if (selectedExpenseCategory.value === 'Add Others') {
    // Prompt for a new expense label
    const label = window.prompt('Enter the label for the new expense field:');
    if (label) {
      expenseTextFields.value.push({ label, value: 0 });
    }
  } else {
    // Add the selected category to the expense fields
    expenseTextFields.value.push({ label: selectedExpenseCategory.value, value: 0 });
  }
  // Clear the selected category
  selectedExpenseCategory.value = '';
};

const totalExpenses = computed(() => {
  const expenses = expenseTextFields.value.map(item => parseFloat(item.value.toString()) || 0);
  return expenses.reduce((sum, expense) => sum + expense, 0).toFixed(2);
});


// liabilities data and functions
const liabilitiesTextFields = ref([
  { label: 'Credit Cards #1', value: 0 },
  { label: 'Home Mortgage Loan', value: 0 },
  { label: 'Car Loans', value: 0 },
  { label: 'Personal Loans', value: 0 }
])

const selectedLiabilityCategory = ref('');
const liabilityCategories = [
  'Credit Cards #2',
  'Credit Cards #3',
  'School Loans',
  'Add Others'
];

// Remove the chosen category to the choices
const availableLiabilityCategories = computed(() => {
  const chosenCategories = liabilitiesTextFields.value.map(item => item.label);
  return liabilityCategories.filter(category => !chosenCategories.includes(category));
});

const handleLiabilityCategoryChange = () => {
  if (selectedLiabilityCategory.value === 'Add Others') {
    // Prompt for a new liability label
    const label = window.prompt('Enter the label for the new liability field:');
    if (label) {
      liabilitiesTextFields.value.push({ label, value: 0 });
    }
  } else {
    // Add the selected category to the liability fields
    liabilitiesTextFields.value.push({ label: selectedLiabilityCategory.value, value: 0 });
  }
  // Clear the selected category
  selectedLiabilityCategory.value = '';
};

const totalLiabilities = computed(() => {
  const liabilities = liabilitiesTextFields.value.map(item => parseFloat(item.value.toString()) || 0);
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
    liabilities: liabilitiesTextFields.value.map(liability => ({
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
    
<style scoped>
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
    