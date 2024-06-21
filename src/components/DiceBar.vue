<script setup>
import { sendResults, playerName } from '../sync/dice-results';
import DiceBox from './DiceBox.vue'
import { ref } from 'vue'

const props = defineProps(['autoWild', 'autoExplode', 'high', 'low', 'roll', 'clear'])
const emits = defineEmits(['list'])

const doneCounter = ref(0);
const handleDone = () => {
    doneCounter.value++;
    if (doneCounter.value == 6) {
        sendResults({
            player: playerName.value,
            list: JSON.stringify(totals.value),
            preferences: {
                autoWild: props.autoWild,
                autoExplode: props.autoExplode,
                high: props.high,
                low: props.low
            }
        });
        emits('list', totals.value);
        totals.value = [];
        doneCounter.value = 0;
    }
}

const totals = ref([]);
const handleList = (type, list) => {
    if (list.length == 0) return;
    totals.value.push({ type, list });
}
const handleWild = (wild) => {
    if (wild == 0) return;
    totals.value.push({ type: 'wild', list: wild });
}
</script>

<template>
    <div class="dice-container"
    @contextmenu.prevent
    >
        <DiceBox path="/dice-d4.svg" :sides="4" :clear="clear" :roll="roll" :explode="autoExplode"
        @done="handleDone"
        @wild="handleWild"
        @list="handleList('d4', $event)"
        />
        <DiceBox path="/dice-d6.svg" :sides="6" :clear="clear" :roll="roll" :explode="autoExplode" :min-amount="autoWild"
        @done="handleDone"
        @wild="handleWild"
        @list="handleList('d6', $event)"
        />
        <DiceBox path="/dice-d8.svg" :sides="8" :clear="clear" :roll="roll" :explode="autoExplode"
        @done="handleDone"
        @wild="handleWild"
        @list="handleList('d8', $event)"
        />
        <DiceBox path="/dice-d10.svg" :sides="10" :clear="clear" :roll="roll" :explode="autoExplode"
        @done="handleDone"
        @wild="handleWild"
        @list="handleList('d10', $event)"
        />
        <DiceBox path="/dice-d12.svg" :sides="12" :clear="clear" :roll="roll" :explode="autoExplode"
        @done="handleDone"
        @wild="handleWild"
        @list="handleList('d12', $event)"
        />
        <DiceBox path="/dice-d20.svg" :sides="20" :clear="clear" :roll="roll" :explode="autoExplode"
        @done="handleDone"
        @wild="handleWild"
        @list="handleList('d20', $event)"
        />
    </div>
</template>

<style scoped>
.dice-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 13px;
}
</style>