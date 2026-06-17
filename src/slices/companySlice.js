import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    data: null,      // resolved company object
    loading: true,   // true until first resolution attempt completes
    error: null,
  },
  reducers: {
    setCompany(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCompanyError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setCompanyLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCompany, setCompanyError, setCompanyLoading } = companySlice.actions;
export default companySlice.reducer;
