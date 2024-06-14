<script setup>
import { ref } from 'vue';

const emits = defineEmits(['wild-die', 'explode-die', 'roll', 'clear']);
const wildDieSelected = ref(false);
const explodeDieSelected = ref(false);

const roll = () => {
    emits('roll');
}
const clear = () => {
    wildDieSelected.value = false;
    explodeDieSelected.value = false;
    emits('clear');
}
const wildDie = () => {
    wildDieSelected.value = !wildDieSelected.value;
    emits('wild-die');
}
const explodeDie = () => {
    explodeDieSelected.value = !explodeDieSelected.value;
    emits('explode-die');
}

</script>

<template>
    <div class="action-bar"
    @contextmenu.prevent
    >
        <div class="group">
            <button
            class="pill"
            :class="{ 'active': wildDieSelected }"
            @click="wildDie"
            >
                Wild
            </button>
            <button
            class="pill"
            :class="{ 'active': explodeDieSelected }"
            @click="explodeDie"
            >
                Explode
            </button>
        </div>
        <div class="group">
            <button
            class="square-button"
            @click="roll"
            >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506" style="enable-background:new 0 0 507.506 507.506;" xml:space="preserve">
                    <title>Roll</title>
                    <g>
                        <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
                    </g>
                </svg>
            </button>
            <button
            class="square-button"
            @click="clear"
            >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Clear</title>
                    <g id="_01_align_center" data-name="01 align center">
                        <path d="M18.965,8.464l5.029-5.029L22.565,2.006,17.519,7.051,15.313,4.895a2.011,2.011,0,0,0-2.724-.073A19.71,19.71,0,0,1,6.226,8.687L-.006,10.514v.756A12.892,12.892,0,0,0,13.006,24.006h1.241l.261-.182a14.98,14.98,0,0,0,6.886-12.081,2.013,2.013,0,0,0-.611-1.5ZM13.9,6.34l5.477,5.341a12.652,12.652,0,0,1-.456,3.015L11.941,7.9A24.691,24.691,0,0,0,13.9,6.34Zm-.294,15.645h-.6a11.153,11.153,0,0,1-4.293-.859,11.55,11.55,0,0,0,4.348-3.8l.518-.76L11.91,15.43l-.518.761A9.539,9.539,0,0,1,7.8,19.324l-1.229.618a10.9,10.9,0,0,1-2.585-2.563,11.632,11.632,0,0,0,4.357-2.657L6.932,13.277a9.611,9.611,0,0,1-3.974,2.317,10.4,10.4,0,0,1-.921-3.575l4.755-1.394a15.234,15.234,0,0,0,3.423-1.59l7.911,7.7A14.1,14.1,0,0,1,13.608,21.985Z"/>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    margin-right: 16px;
}

.group {
    display: flex;
    gap: 12px;
}

::selection, ::-moz-selection {
    background-color: transparent;
}

button {
    position: relative;
}

button:focus {
    outline: none;
}

.active {
    background-color: var(--color-success-text);
}

svg {
    height: 20px;
}

.pill {
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
}

.square-button {
    /* border-radius: 15%; */
    border: none;
    width: 35px;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
    display: grid;
    place-items: center;
}
.square-button:hover {
    color: var(--color-hover);
}
</style>