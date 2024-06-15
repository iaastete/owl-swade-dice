<script setup>
import { ID } from '../utils/config';
import { temporaryOpen, customDieSort } from '../sync/dice-results';
import OBR from '@owlbear-rodeo/sdk';

import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

const player = ref('')
const data = ref({});

const sumList = (list) => {
    return list.reduce((acc, curr) => acc + curr, 0);
}

OBR.onReady(() => {
    const channel = `${ID}/popover`;
    OBR.broadcast.onMessage(channel, (message) => {
        const json = message.data;
        if (json.list === '[]') return;
        player.value = json.player;
        const array = JSON.parse(json.list);
        data.value = array.sort(customDieSort);
        temporaryOpen();
    })
});

</script>
<template>
    <header>{{ player }}</header>
    <main>
        <div class="dice-container" v-for="(item, index) in data" :key="index">
            <div class="dice-img">
                <img :src="`/dice-${item.type}.svg`"/>
                <p class="sides">{{ item.type.slice(1) }}</p>
            </div>
            <p>{{ sumList(item.list) }}</p>
        </div>
    </main>
</template>
<style scoped>
.dice-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 13px;
}

.dice-img {
    position: relative;
}

.sides {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, calc(-20px));
    font-size: 20px;
    text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; 
}
</style>