import { ID } from "../utils/config.js";
import OBR from "@owlbear-rodeo/sdk";

const openModal = async (list) => {
    const stringParams = [];
    list.forEach((item) => {
        stringParams.push(`&${item.type}=${item.list.join(",")}`);
    })
    OBR.modal.open({
        id: `${ID}/modal`,
        url: `/modal?${stringParams.join("")}`,
        width: 300,
        height: 400,
        hidePaper: false,
    });
};

const closeModal = async () => {
    await OBR.modal.close(`${ID}/modal`);
};

export { openModal, closeModal };