import { configureStore } from '@reduxjs/toolkit'
import organisationsSlice from '../features/organisationSlice'

const store = configureStore({
    reducer: {
        organisation: organisationsSlice
    }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, organisations: OrganisationsState}
export type AppDispatch = typeof store.dispatch