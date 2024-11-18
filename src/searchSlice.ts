import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    topicName: string;
}

const initialState: SearchState = {
    topicName: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setTopicName(state, action: PayloadAction<string>) {
            state.topicName = action.payload;
        },
    },
});

export const { setTopicName } = searchSlice.actions;
export default searchSlice.reducer;
export type { SearchState }; 