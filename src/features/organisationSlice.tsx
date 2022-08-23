import axios from 'axios'
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import Organisation from '../models/organisation'

type InitialState = {
  loading: boolean
  organisations: Organisation[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  organisations: [],
  error: '',
}

// Generates pending, fulfilled and rejected action types
export const fetchOrganisations = createAsyncThunk(
  'organisation/fetchOrganisations',
  () => {
    return axios
      .get(
        'https://assignment-fe.s3.eu-central-1.amazonaws.com/organisations.json'
      )
      .then((response) => response.data)
  }
)

const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrganisations.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchOrganisations.fulfilled,
      (state, action: PayloadAction<Organisation[]>) => {
        state.loading = false
        state.organisations = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchOrganisations.rejected, (state, action) => {
      state.loading = false
      state.organisations = []
      state.error = action.error.message || 'Something went wrong'
    })
  },
})

export default organisationSlice.reducer
