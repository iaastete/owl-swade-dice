<script setup>
import { useRoute, useRouter } from 'vue-router';
import { closeModal } from '../sync/modal';
import { ref, computed } from 'vue';

const route = useRoute();
const router = useRouter();

const queryParams = ref(route.query);
const list = computed(() => {
    return Object.keys(queryParams.value).map(key => {
        if (key === 'obrref') return;
        return {
            type: key,
            list: queryParams.value[key].split(',').map(Number)
        }
    }).filter(item => {
        return item?.type;
    });
});

</script>
<template>
    <div class="sticky">
        <h2>Roll details</h2>
        <button
        @click="closeModal"
        >
        <svg class="close" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
            <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
        </svg>
        </button>
    </div>
    <main>
        <div
        class="result-list"
        v-for="item in list"
        >
            <div>
                <div class="container">
                    <div class="icon">
                        <img :src="'/dice-' + item?.type + '.svg'" />
                    </div>
                    <div class="result">
                        <p>{{ item?.list?.join(', ') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.sticky {
    position: sticky;
    top: 0px;
    background-color: var(--color-source);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px 0px 20px;
    color: white;
}
.container {
    display: grid;
    margin : 10px 0px;
    grid-template-columns: 50px 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
    "icon result result"
}

.icon {
    grid-area: icon;
    width: min-content;
    height: min-content;
    margin: 5px auto;
}

.close {
    height: 35px;
    width: 35px;
}

.result {
    margin: 0px 10px 0px 5px;
    padding: 0px 10px;
    grid-area: result;
    background-color: var(--color-source-mono);
    border-radius: 10px;
    text-align: left;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
}

button:hover {
    color: var(--color-primary);
}
</style>