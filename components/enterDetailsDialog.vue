<template>
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-card class="elegant-card" elevation="10">
            <v-row>
              <v-col>
                <h2 class="headline mb-4">Please enter your details to submit the form</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="user.email" type="email" label="Email Address"
                  :rules="[validateEmail]"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="user.fullName" label="Full Name" :rules="[requiredRule]"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="user.phone" type="number" label="Mobile Number"
                  :rules="[requiredRule]"></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo darken-3" class="text-none" flat size="large" @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn color="indigo darken-3" class="text-none" flat size="large" @click="submit" :disabled="!isFormValid">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  const emit = defineEmits(['submitForm', 'closeEnterDetailsDialog']);
  const user = ref({
    fullName: null,
    phone: null,
    email: null
  });
  
  const submit = () => {
    emit('submitForm', user.value);
    closeDialog();
  };
  
  const closeDialog = () => {
    emit('closeEnterDetailsDialog');
  };
  
  const validateEmail = (value: string | null) => {
    if (value === null) {
      return 'Email is required';
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) || 'Invalid email address';
  };
  
  const requiredRule = (value: string | null) => {
    return (value !== null && value !== '') || 'Field is required';
  };
  
  const isFormValid = computed(() => {
    return validateEmail(user.value.email) === true &&
      requiredRule(user.value.fullName) === true &&
      requiredRule(user.value.phone) === true;
  });
  </script>
  
  <style scoped>
  .elegant-card {
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 20px;
  }
  
  .headline {
    font-size: 1.5rem;
    color: #333;
  }
  
  /* Add more styles as needed */
  </style>
  