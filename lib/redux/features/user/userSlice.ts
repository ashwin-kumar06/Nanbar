import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UUID } from 'crypto'

interface User {
  id: string
  name: string
  mobile: string
  email: string
  addedOn: Date
}

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },

    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer