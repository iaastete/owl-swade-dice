<script setup>
const props = defineProps(['message'])

</script>

<template>
    <div id="bubble" class="bubble">
        {{ message }}
    </div>
</template>

<style scoped>
.bubble {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: var(--color-bubble-bg);
    position: absolute;
    top: -7px;
    right: -7px;
    font-size: 14px;
    line-height: 16px;
    color: white;
}
</style>