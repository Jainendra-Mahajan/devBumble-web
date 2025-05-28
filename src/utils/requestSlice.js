import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: [],
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },

        removeRequest: (state, action) => {
            const updatedRequests = state.filter(req => req._id !== action.payload);
            return updatedRequests;
        }
    }
})

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer