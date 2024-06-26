<script setup>
import DiceBar from '../components/DiceBar.vue';
import ActionBar from '../components/ActionBar.vue';
import Display from '../components/Display.vue';
import Preferences from '../components/Preferences.vue';

import { ref } from 'vue';

const passList = ref([]);

// states
const autoWild = ref({state: false, value: '0'});
const autoExplode = ref(false);
const autoHighest = ref(false);
const autoLowest = ref(false);
const handleWild = (value) => {
    if (value === '0') {
        autoWild.value = {state: false, value: '0'};
    } else {
        autoWild.value = {state: true, value};
    }
}

// actions
const roll = ref(false);
const clear = ref(false);

const handleClear = () => {
    clear.value = !clear.value;
}
</script>

<template>
    <header>
        <Preferences
        @wild-die="handleWild"
        @explode-die="autoExplode = !autoExplode"
        @highest-die="autoHighest = !autoHighest"
        @lowest-die="autoLowest = !autoLowest"
        />
    </header>
    <main>
        <Display
        :list="passList"
        :wild="autoWild"
        :high="autoHighest"
        :low="autoLowest"
        />
    </main>
    <footer>
        <ActionBar
        @roll="roll = !roll"
        @clear="handleClear"
        >
            <DiceBar
            :auto-wild="autoWild"
            :auto-explode="autoExplode"
            :high="autoHighest"
            :low="autoLowest"
            :roll="roll"
            :clear="clear"
            @list="passList = $event"
            />
        </ActionBar>
    </footer>
</template>

<style scoped>
</style>