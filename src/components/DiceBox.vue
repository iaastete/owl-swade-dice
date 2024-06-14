<script setup>
import Bubble from './Bubble.vue';
import Dice from '../classes/dice.js';
import { ref, computed, watch } from 'vue';

const props = defineProps(['path', 'sides', 'minAmount', 'explode', 'roll', 'clear']);
const dice = new Dice(props.sides);

const lastResult = ref([]);
const wildResult = ref(0);
const critFail = (num) => num == 1;
const critSuccess = (num, solo=false) => {
    if (solo) return num >= props.sides;
    if (!amountToRoll.value) return num >= props.sides;
    return num >= props.sides * amountToRoll.value;
};
const sumResult = computed(() => {
    const sum = lastResult.value.reduce((acc, curr) => acc + curr, 0)
    return sum ? sum : '';
});

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
        if (amountToRoll.value > 0 || newVal.minAmount) {
            setTimeout(() => {
                if (newVal?.minAmount) wildResult.value = dice.roll(explode.value);
                lastResult.value = dice.rollMultiple(amountToRoll.value, explode.value);
            }, 200);
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
                <Bubble style="right: -7px" v-if="showBubble" :message="amountToRoll"/>
            </Transition>
            <Transition name="pop">
                <Bubble class="wild-selection" v-if="minAmount" :message="'★'"/>
            </Transition>
        </button>
        <div class="dice-result"
        :title="lastResult.join(', ')"
        >
            <p 
            v-if="minAmount"
            :class="{ 'top-left-corner': minAmount && amountToRoll, 'success': critSuccess(wildResult, true), 'failure': critFail(wildResult) }"
            >
                {{ wildResult ? wildResult : ''}}★
            </p>
            <hr v-if="minAmount && amountToRoll" class="split"/>
            <p
            v-if="amountToRoll"
            :class="{ 'bottom-right-corner': minAmount && amountToRoll, 'success': critSuccess(sumResult), 'failure': critFail(sumResult) }"
            >
                {{ sumResult }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.split {
    width: 100%;
    border-top: 1px solid grey;
    border-bottom: 0px solid grey;
    border-left: 0px solid grey;
    border-right: 0px solid grey;
}

.top-left-corner {
    position: absolute;
    bottom: 3px;
    left: 0px;
    width: 35px;
    height: 19px;
    line-height: normal;
    overflow: hidden;
}
.bottom-right-corner {
    position: absolute;
    top: 1px;
    right: 0px;
    width: 35px;
    height: 19px;
    line-height: normal;
}

.dice-structure {
    position: relative;
    display: inline-block;
    margin-top: 10px;
}

.dice-result {
    position: relative;
    margin-top: 5px;
    border-radius: 15%;
    border: 1px solid grey;
    width: 35px;
    height: 35px;
    line-height: 35px;
    cursor: default;
    display: flex;
    justify-content: center;
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
    top: 0%;
    left: 50%;
    transform: translate(-50%, calc(-18px));
    font-size: 20px;
    text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; 
}

.success {
    color: var(--color-success-text);
}

.failure {
    color: var(--color-failure-text);
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
    top: -14px;
    font-size: 20px;
}

</style>