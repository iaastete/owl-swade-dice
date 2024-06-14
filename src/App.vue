<script setup>
import DiceBar from './components/DiceBar.vue';
import ActionBar from './components/ActionBar.vue';

import OBR from '@owlbear-rodeo/sdk'

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

const tryPop = async () => {
    await Promise.all([
        OBR.popover.setWidth("dice-bar.com.asd.test/popover", 300),
        OBR.popover.setHeight("dice-bar.com.asd.test/popover", 300),
    ])

    setTimeout(() => {
        OBR.popover.setWidth("dice-bar.com.asd.test/popover", 0)
        OBR.popover.setHeight("dice-bar.com.asd.test/popover", 0)
    }, 1000)
}

OBR.onReady(() => {
    OBR.popover.open({
        id: "dice-bar.com.asd.test/popover",
        width: 0,
        height: 0,
        anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM"},
        transformOrigin: { horizontal: "RIGHT", vertical: "BOTTOM"},
        disableClickAway: true,
        hidePaper: true,
        url: "/index.html",
    })
});

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
    <!-- <main>
        <ActionBar
        @wild-die="autoWild = !autoWild"
        @explode-die="autoExplode = !autoExplode"
        @roll="roll = !roll"
        @clear="handleClear"
        />
    </main> -->
    <button
    @click="tryPop"
    >
    HEY
</button>

</template>

<style scoped>
</style>
