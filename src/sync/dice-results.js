import { ID } from '../utils/config.js';
import OBR from '@owlbear-rodeo/sdk'
import { ref } from 'vue';

const playerName = ref('');

const setupPopover = () => {
    OBR.popover.open({
        id: `${ID}/popover`,
        url: "/results",
        width: 0,
        height: 0,
        anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM"},
        transformOrigin: { horizontal: "RIGHT", vertical: "BOTTOM"},
        disableClickAway: true,
        hidePaper: true,
    });
};

const temporaryOpen = async () => {
    const popover = OBR.popover
    await Promise.all([
        popover.setWidth(`${ID}/popover`, 330),
        popover.setHeight(`${ID}/popover`, 110),
    ])

    setTimeout( async () => {
        await Promise.all([
            popover.setWidth(`${ID}/popover`, 0),
            popover.setHeight(`${ID}/popover`, 0),
        ])
    }, 5000);
};

const setupComms = () => {
    const channel = `${ID}/popover`;
    OBR.broadcast.onMessage(channel, (message) => {
        const result = message.data;
        temporaryOpen();
    })
};

const sendResults = (results) => {
    const channel = `${ID}/popover`;
    OBR.broadcast.sendMessage(channel, results);
};

const customDieSort = (a,b) => {
    const preferedOrder = ['d4', 'wild', 'd6', 'd8', 'd10', 'd12', 'd20'];
    return preferedOrder.indexOf(a) - preferedOrder.indexOf(b);
}

const setupDiceResults = () => {

};

export { setupDiceResults, setupPopover, temporaryOpen, setupComms, sendResults, playerName, customDieSort };