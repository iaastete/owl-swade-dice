<script setup>
import { ref } from 'vue';
const emits = defineEmits(['wild-die', 'explode-die', 'highest-die', 'lowest-die']);

const wildDieSelected = ref(false);
const explodeDieSelected = ref(false);
const highestDieSelected = ref(false);
const lowestDieSelected = ref(false);

const wildDie = () => {
    wildDieSelected.value = !wildDieSelected.value;
    emits('wild-die');
}
const explodeDie = () => {
    explodeDieSelected.value = !explodeDieSelected.value;
    emits('explode-die');
}
const highestDie = () => {
    highestDieSelected.value = !highestDieSelected.value;
    if (lowestDieSelected.value) {
        lowestDieSelected.value = false;
        emits('lowest-die');
    }
    emits('highest-die');
}
const lowestDie = () => {
    lowestDieSelected.value = !lowestDieSelected.value;
    if (highestDieSelected.value) {
        highestDieSelected.value = false;
        emits('highest-die');
    }
    emits('lowest-die');
}

</script>

<template>
    <div class="container">
        <div class="action-bar"
        @contextmenu.prevent
        >
            <button
            class="chip"
            :class="{ 'active': wildDieSelected }"
            @click="wildDie"
            >
                Wild
            </button>
            <button
            class="chip"
            :class="{ 'active': explodeDieSelected }"
            @click="explodeDie"
            >
                Explode
            </button>
            <button
            class="chip"
            :class="{ 'active': highestDieSelected }"
            @click="highestDie"
            >
                Highest
            </button>
            <button
            class="chip"
            :class="{ 'active': lowestDieSelected }"
            @click="lowestDie"
            >
                Lowest
            </button>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 10px auto;
    width: 95%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.chip {
    padding: 5px 10px;
    margin: 0px 5px;
}

.active {
    background-color: var(--color-source-mono);
    color: var(--color-primary);
    border-color: var(--color-primary);
}
</style>