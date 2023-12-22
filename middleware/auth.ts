import { useAppStore } from "../store/pinia";


const appStore = useAppStore();

export default defineNuxtRouteMiddleware((to, from) => {
    if (!appStore.isLoggedIn) {
        return navigateTo('/');
    }
})