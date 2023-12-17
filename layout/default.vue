<template>
    <div class="container">
        <div class="container">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-image: url('../assets/financial_sheet_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
</style>