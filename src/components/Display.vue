<script setup>
import { handleResizeText } from '../utils/resize';
import { handleLateralScroll } from '../utils/controls';
import { getTotal, getWildResult, getHighest, getLowest } from '../utils/sum-total';

import { openModal } from '../sync/modal';

import { computed, onMounted } from 'vue';

const props = defineProps(['list', 'wild', 'high', 'low'])

const handleFilters = computed(() => {
    if (props?.high) return getHighest(props?.list);
    if (props?.low) {
        const result = getLowest(props?.list);
        return result === Infinity ? 0 : result;
    }
    if (props?.wild) return getWildResult(props?.list);
    return getTotal(props?.list);   
});

onMounted(() => {
    const p = document.querySelector('.top .center');
    const resizeObserver = new ResizeObserver( entries => {
        for (let entry of entries) {
            if (entry.target === p) {
                handleResizeText(p, 74);
            };
        }
    })

    resizeObserver.observe(p);
})
</script>

<template>
    <div class="top">
        <p class="header">Total:</p>
        <p class="center"
        :title="handleFilters"
        >{{ handleFilters }}</p>
    </div>
    <div class="bottom">
        <div class="content"
        @wheel="handleLateralScroll"
        >
            <div
            class="center"
            v-for="item in props.list"
            >
                <p class="bold">{{ item.type }}: &#160</p>
                <p>{{ item.list.join(', ') }}</p>
            </div>
        </div>
        <button
        @click="openModal(props.list)"
        >
            <img src="/arrow-up-right-from-square.svg" />
        </button>
    </div>
</template>

<style scoped>
.top {
    position: relative;
    margin: auto;
    width: 75px;
    height: 75px;
    border-radius: 10%;
    background-color: var(--color-source-mono);
    color: white;
}

.top .header {
    position: absolute;
    top: -10px;
    left: 5px;
    font-size: 11px;
    font-weight: 500;
}

.top .center {
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

.bottom {
    margin: 10px auto;
    width: 95%;
    height: 45px;
    border-radius: 10px;
    background-color: var(--color-source-mono);
    display: flex;
    justify-content: space-between;
}

.bottom .content {
    margin-left: 10px;
    width: 100%;
    overflow: auto;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
}

.bottom .content .center {
    position: relative;
    display: flex;
    flex-direction: row;
    top: -6px;
    left: 5px;
    font-size: 1rem;
    font-weight: 500;
    padding: 0px 5px;
}

button {
    background-color: transparent;
    position: relative;
    border: none;
    cursor: pointer;
    margin: 0px 12px;
    padding: 0px;
}

button:focus {
    outline: none;
}

.bold {
    font-weight: 700;
}

svg {
    height: 20px;
}
</style>