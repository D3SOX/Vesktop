/*
 * SPDX-License-Identifier: GPL-3.0
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 */

import { findByPropsLazy, findStoreLazy, onceReady } from "@vencord/types/webpack";
import { FluxDispatcher } from "@vencord/types/webpack/common";

import { Keybind, KeybindsStoreType } from "../../shared/keybinds";
import { addPatch } from "./shared";

const KeybindsStore: KeybindsStoreType = findStoreLazy("KeybindsStore");
const MuteActions: {
    toggleSelfMute: () => void;
    toggleSelfDeaf: () => void;
} = findByPropsLazy("MuteActions");

// Re-enable Discord's keybind editor
addPatch({
    patches: [
        {
            // maybe one day they will fix the typo "broswer"
            find: "Messages.KEYBIND_IN_BROSWER_NOTICE",
            replacement: [
                {
                    // eslint-disable-next-line no-useless-escape
                    match: /\i\.isPlatformEmbedded/,
                    replace: "true"
                }
            ]
        }
    ]
});

onceReady.then(() => {
    // register keybinds on load
    registerAllKeybinds();

    // we only need this event as this gets fired when the keybinds page is opened/closed and this is the only place where we need to adjust our keybinds
    FluxDispatcher.subscribe("KEYBINDS_ENABLE_ALL_KEYBINDS", ({ enable }: { enable: boolean }) => {
        console.log("keybinds enable all keybinds", enable);
        if (enable) {
            registerAllKeybinds();
        } else {
            VesktopNative.keybinds.unregister();
        }
    });
});

function shouldAllowKeybind(keybind: Keybind) {
    return keybind.enabled && !keybind.managed && keybind.shortcut && keybind.action !== "UNASSIGNED";
}

function getKeybindHandler(action: Keybind["action"]) {
    return () => {
        // execute the action
        switch (action) {
            case "TOGGLE_MUTE":
                MuteActions.toggleSelfMute();
                break;
            case "TOGGLE_DEAFEN":
                MuteActions.toggleSelfDeaf();
                break;
            default:
                console.warn("Unknown keybind action", action);
        }
    };
}

function registerAllKeybinds() {
    const keybinds = KeybindsStore.getState();
    for (const keybind of Object.values(keybinds)) {
        if (!shouldAllowKeybind(keybind)) {
            continue;
        }

        const { id, shortcut, action } = keybind;
        VesktopNative.keybinds.register(id, shortcut, getKeybindHandler(action));
        console.log("keybind registered", action);
    }
}
