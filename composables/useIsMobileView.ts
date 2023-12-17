import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useIsMobileView() {
  const isMobileView = ref(false);

  const checkMobileView = () => {
    isMobileView.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobileView);
  });

  return isMobileView;
}
