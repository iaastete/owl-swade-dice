<script setup>
import Bubble from './Bubble.vue';
import Dice from '../classes/dice.js';

import { ref, computed, watch } from 'vue';

const props = defineProps(['path', 'sides', 'minAmount', 'explode', 'roll', 'clear']);
const emits = defineEmits(['list', 'wild', 'done']);
const dice = new Dice(props.sides);

const lastResult = ref([]);
const wildResult = ref(0);

const explode = ref(false);
const lastRoll = ref(false);
const lastClear = ref(false);
const amountToRoll = ref(0);
const showBubble = computed(() => amountToRoll.value > 0);
watch(props, (newVal, oldVal) => {
    // listen to explode prop
    if (newVal?.explode) explode.value = newVal.explode;
    else explode.value = false;

    // listen to roll prop
    if ((newVal?.roll !== (undefined)) && (lastRoll.value !== newVal?.roll)) {
        lastRoll.value = newVal?.roll;
        wildResult.value = 0;
        lastResult.value = [];
        if (amountToRoll.value > 0 || newVal.minAmount.state) {
            setTimeout(() => {
                if (newVal?.minAmount.value == 'd'+newVal.sides) wildResult.value = [dice.roll(explode.value)];
                lastResult.value = dice.rollMultiple(amountToRoll.value, explode.value);
                emits('list', lastResult.value);
                emits('wild', wildResult.value);
                emits('done', true);
            }, 150);
        } else {
            emits('done', true);
        }
    }

    // listen to clear prop
    if ((newVal?.clear !== (undefined)) && (lastClear.value !== newVal?.clear)) {
        lastClear.value = newVal?.clear;
        wildResult.value = 0;
        lastResult.value = [];
        amountToRoll.value = 0;
    }

}, { deep: true, immediate: true });

const handleDiceLeftClick = (event, shift=false) => {
    if (shift) amountToRoll.value += 5;
    else amountToRoll.value += 1;
};
const handleDiceRightClick = (event, shift=false) => {
    if (shift) amountToRoll.value = Math.max(amountToRoll.value - 5, 0);
    else amountToRoll.value = Math.max(amountToRoll.value - 1, 0);
};
</script>

<template>
    <div class="dice-structure">
        <button
        @click.left.exact="handleDiceLeftClick($event)"
        @click.right.exact.prevent="handleDiceRightClick($event)"
        @click.left.shift.exact="handleDiceLeftClick($event, true)"
        @click.right.shift.exact.prevent="handleDiceRightClick($event, true)"
        >
            <img :src="path" />
            <p>{{ sides }}</p>
            <Transition name="pop">
                <Bubble v-if="showBubble" :message="amountToRoll"/>
            </Transition>
            <Transition name="pop">
                <Bubble class="wild-selection" v-if="minAmount.value == 'd'+sides" :message="'★'"/>
            </Transition>
        </button>
    </div>
</template>

<style scoped>
.dice-structure {
    position: relative;
    display: flex;
    align-items: center;
}

button {
    background-color: transparent;
    position: relative;
    border: none;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
}
button:hover {
    outline: red;
}
button:focus {
    outline: none;
}

.dice-structure button p {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translate(-50%, calc(-18px));
    font-size: 20px;
    text-shadow:
    -1px -1px 0 var(--color-source-mono),
    1px -1px 0 var(--color-source-mono),
    -1px 1px 0 var(--color-source-mono),
    1px 1px 0 var(--color-source-mono); 
}

.pop-enter-active, .pop-leave-active {
  transition: transform 0.1s ease, opacity 0.1s ease;
}

.pop-enter-from, .pop-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.pop-enter-to, .pop-leave-from {
  transform: scale(1);
  opacity: 1;
}

::selection, ::-moz-selection {
    background-color: transparent;
}

.wild-selection {
    background-color: transparent;
    left: -7px;
    top: -7px;
    font-size: 20px;
}

</style>