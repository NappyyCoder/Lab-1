import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password, email, isRegistering }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append('username', username);
      form.append('password', password);
      form.append('action', isRegistering ? 'register' : 'login');

      if (isRegistering) {
        form.append('email', email);
      }

      const response = await fetch('https://web.ics.purdue.edu/~clayl/test/auth.php', {
        method: 'POST',
        body: form
      });

      const rawResponse = await response.text();
      const data = JSON.parse(rawResponse);

      if (data.success) {
        localStorage.setItem('user', JSON.stringify({ username }));
        return { username };
      } else {
        return rejectWithValue(data.error || 'Authentication failed');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      const response = await fetch("https://web.ics.purdue.edu/~clayl/test/logout.php");
      const data = await response.json();
      localStorage.removeItem('user');
      return data;
    } catch (err) {
      console.error("Error logging out:", err);
      localStorage.removeItem('user');
      return null;
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;