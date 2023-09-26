import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface inviteGroupState {
    name: string;
    url: string;
}

const initialState: inviteGroupState = {
    name: "",
    url: "",
};

const inviteGroupAccountSlice = createSlice({
    name: "inviteGroupAccount",
    initialState,
    reducers: {
        setInviteData: (state, action: PayloadAction<inviteGroupState>) => {
            state.name = action.payload.name;
            state.url = action.payload.url;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => {
            return initialState;
        });
    },
});

export const { setInviteData } = inviteGroupAccountSlice.actions;
export default inviteGroupAccountSlice.reducer;
