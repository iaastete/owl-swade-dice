<script setup>
import DiceBox from './DiceBox.vue'
import { ref } from 'vue'

const props = defineProps(['autoWild', 'autoExplode', 'roll', 'clear'])
</script>

<template>
    <div class="dice-container"
    @contextmenu.prevent
    >
        <DiceBox path="/dice-d4.svg" :sides="4" :clear="clear" :roll="roll" :explode="autoExplode"/>
        <DiceBox path="/dice-d6.svg" :sides="6" :clear="clear" :roll="roll" :explode="autoExplode" :min-amount="autoWild"/>
        <DiceBox path="/dice-d8.svg" :sides="8" :clear="clear" :roll="roll" :explode="autoExplode"/>
        <DiceBox path="/dice-d10.svg" :sides="10" :clear="clear" :roll="roll" :explode="autoExplode"/>
        <DiceBox path="/dice-d12.svg" :sides="12" :clear="clear" :roll="roll" :explode="autoExplode"/>
        <DiceBox path="/dice-d20.svg" :sides="20" :clear="clear" :roll="roll" :explode="autoExplode"/>
    </div>
</template>

<style scoped>
.dice-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
}
</style>