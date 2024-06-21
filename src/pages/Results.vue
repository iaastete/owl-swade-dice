<script setup>
import { ID } from '../utils/config';
import { getTotal, getHighest, getLowest, getWildResult } from '../utils/sum-total';
import { handleResizeText } from '../utils/resize';
import { handleLateralScroll } from '../utils/controls';
import { temporaryOpen, customDieSort } from '../sync/dice-results';
import OBR from '@owlbear-rodeo/sdk';

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

const route = useRoute();
const router = useRouter();

const player = ref('')
const data = ref([]);
const preferences = ref({});

OBR.onReady(() => {
    const channel = `${ID}/popover`;
    OBR.broadcast.onMessage(channel, (message) => {
        const json = message.data;
        if (json.list === '[]') return;
        player.value = json.player;
        const array = JSON.parse(json.list);
        data.value = array.sort(customDieSort);
        preferences.value = json.preferences;
        temporaryOpen();
    })
});

const handleFilters = computed(() => {
    if (preferences.value.high) return getHighest(data.value);
    if (preferences.value.low) return getLowest(data.value);
    if (preferences.value.wild) return getWildResult(data.value);
    return getTotal(data.value);   
});

onMounted(() => {
    const p = document.querySelector('.side #text');
    const resizeObserver = new ResizeObserver( entries => {
        for (let entry of entries) {
            if (entry.target === p) handleResizeText(p, 74);
        }
    });

    resizeObserver.observe(p);
})

</script>
<template>
    <div class="container">
        <div class="side">
            <p id="header">Total: </p>
            <p id="text" :title="getTotal(data)">
                {{ handleFilters }}
            </p>
        </div>
        <div class="name">{{ player }}</div>
        <div class="result"
        @wheel="handleLateralScroll"
        >
            <div
            class="center"
            v-for="item in data"
            >
                <p class="bold">{{ item.type }}: &#160</p>
                <p>{{ item.list }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    margin: 15px 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
        "side name name"
        "side result result"
        "side result result";
}

.side {
    grid-area: side;
    position: relative;
    margin: auto;
    width: 75px;
    height: 75px;
    border-radius: 10%;
    background-color: var(--color-source-mono);
    color: white;
}

.side #header {
    position: absolute;
    top: -10px;
    left: 5px;
    font-size: 11px;
    font-weight: 500;
}

.side #text {
    margin : 0px auto;
    height: 100%;
    width: fit-content;
    max-width: 100%;
    font-weight: 700;
    line-height: 75px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    grid-area: name;
    text-align: left;
}

.result {
    grid-area: result;
    text-align: left;
    background-color: var(--color-source-mono);
    border-radius: 10px;
    padding: 10px;
    overflow: auto;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 30px;
}

.result .center {
    position: relative;
    display: flex;
    flex-direction: row;
    top: -15px;
    left: 5px;
    font-size: 1rem;
    font-weight: 500;
    padding: 0px 5px;
}

.bold {
    font-weight: 700;
}
</style>