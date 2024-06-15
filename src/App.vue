<script setup>
import { ID } from './utils/config.js';
import { setupPopover, playerName } from './sync/dice-results.js'
import OBR from '@owlbear-rodeo/sdk'

import { ref } from 'vue'

OBR.onReady( async () => {
    setupPopover()
    playerName.value = await OBR.player.getName();
})
</script>

<template>
    <router-view />
</template>

<style scoped>
</style>
