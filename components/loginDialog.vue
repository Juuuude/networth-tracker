<template>
    <v-container>
        <div>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
                <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                <v-text-field v-model="email" density="compact" placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password

                    <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                        target="_blank">
                        Forgot login password?</a>
                </div>

                <v-text-field v-model="password" @keyup.enter="login" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="visible = !visible"></v-text-field>

                <v-card class="mb-12" color="surface-variant" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
                        hours. If you must login now, you can also click "Forgot login password?" below to reset the login
                        password.
                    </v-card-text>
                </v-card>

                <v-btn block class="mb-8 button-text" color="#217346" size="large" @click="login" :disabled="!formIsValid" :loading="isLoggingIn">
                    Log in
                </v-btn>
                <v-alert v-if="errorMessage" type="error" class="mb-4" closable>
                    {{ errorMessage }}
                </v-alert>
            </v-card>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue';
import { useAppStore } from "../store/pinia";
import { useRouter } from "vue-router";


const { signInUser } = useFirebaseAuth() // auto-imported
const appStore = useAppStore();
const router = useRouter();
const visible = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoggingIn = ref(false);

const formIsValid = computed(() => email.value && password.value);
console.log(appStore.isLoggedIn)
const login = async () => {
    isLoggingIn.value = true;
    try {
        const user = await signInUser(email.value, password.value)
        if(user.email) {
            appStore.updateIsLoggedInStatus(true)
            router.push('/admin')
        }
    } catch (error: any) {
        errorMessage.value = 'Login failed. Please check your email and password.';
        setTimeout(() => {
            errorMessage.value = '';
        }, 3000);
    } finally {
        isLoggingIn.value = false;
    }
}

</script>