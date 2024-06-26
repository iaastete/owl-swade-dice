<script setup>
import { ref } from 'vue';
const emits = defineEmits(['wild-die', 'explode-die', 'highest-die', 'lowest-die']);

const explodeDieSelected = ref(false);
const highestDieSelected = ref(false);
const lowestDieSelected = ref(false);

const selected = ref('0');
const options = ref([
    {text: 'Wild', value: '0'},
    {text: 'Wild d4', value: 'd4'},
    {text: 'Wild d6', value: 'd6'},
    {text: 'Wild d8', value: 'd8'},
    {text: 'Wild d10', value: 'd10'},
    {text: 'Wild d12', value: 'd12'},
    {text: 'Wild d20', value: 'd20'},
])

const wildDie = () => {
    emits('wild-die', selected.value);
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
            <select
            class="select-chip"
            :class="{ 'active': selected !== '0'}"
            v-model="selected"
            @change="wildDie"
            >
                <option
                v-for="option in options"
                :value="option.value"
                >
                    {{ option.text }}
                </option>
            </select>
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

.select-chip {
    border-radius: 8px;
    border: 1px solid grey;
    padding: 3px 5px;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background: transparent;
    cursor: pointer;
    transition: border-color 0.25s;
}

.select-chip:hover {
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    border-color: var(--color-primary);
}

.select-chip:focus {
    outline: none;
}

.select-chip option {
    background-color: var(--color-source);
    color: white;
}

.active {
    background-color: var(--color-source-mono);
    color: var(--color-primary);
    border-color: var(--color-primary);
}
</style>