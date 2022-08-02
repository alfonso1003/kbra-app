import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  alphabetizeAddressArrayByLastName,
  filterAddressArray
} from "../../utils/addressUtils";

const ADDRESSES_URL = "http://127.0.0.1:5000/api/addresses";

const initialState = {
  addresses: [],
  filteredAddresses: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    const response = await axios.get(ADDRESSES_URL);
    return response.data;
  }
);

export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async (newAddress) => {
    const response = await axios.post(ADDRESSES_URL, newAddress);
    return response.data;
  }
);

export const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    addressAdded: {
      reducer(state, action) {
        state.addresses.push(action.payload);
      }
    },
    filterAddresses: {
      reducer(state, action) {
        return {
          ...state,
          filteredAddresses: filterAddressArray(
            state.addresses,
            action.payload.searchTerm
          )
        };
      }
    },
    clearFilteredAddresses: {
      reducer(state, action) {
        return { ...state, filteredAddresses: [] };
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddresses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = alphabetizeAddressArrayByLastName(action.payload);
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
        state.addresses = alphabetizeAddressArrayByLastName(state.addresses);
      });
  }
});

export const selectAllAddresses = (state) => state.addresses.addresses;
export const getAddressesStatus = (state) => state.addresses.status;
export const getAddressesError = (state) => state.addresses.error;
export const getFilteredAddresses = (state) =>
  state.addresses.filteredAddresses;

export const { addressAdded, clearFilteredAddresses, filterAddresses } =
  addressSlice.actions;

export default addressSlice.reducer;
