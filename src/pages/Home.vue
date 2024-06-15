<script setup>
import DiceBar from '../components/DiceBar.vue';
import ActionBar from '../components/ActionBar.vue';

import { ref } from 'vue';

const autoWild = ref(false);
const autoExplode = ref(false);
const roll = ref(false);
const clear = ref(false);

const handleClear = () => {
    autoWild.value = false;
    autoExplode.value = false;
    clear.value = !clear.value;
}
</script>

<template>
    <header>
        <DiceBar
        :auto-wild="autoWild"
        :auto-explode="autoExplode"
        :roll="roll"
        :clear="clear"
        />
    </header>
    <main>
        <ActionBar
        @wild-die="autoWild = !autoWild"
        @explode-die="autoExplode = !autoExplode"
        @roll="roll = !roll"
        @clear="handleClear"
        />
    </main>
</template>

<style scoped>
</style>