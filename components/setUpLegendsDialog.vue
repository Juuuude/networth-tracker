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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo darken-3" class="text-none" flat size="large">
                Cancel
              </v-btn>
              <v-btn color="indigo darken-3" class="text-none" flat size="large">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">

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
  