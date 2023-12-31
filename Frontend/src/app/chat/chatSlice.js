import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userToken =
  localStorage.getItem("token") && localStorage.getItem("token");

const initialState = {
  loading: false,
  error: null,
  chats: [], // all the chats of the logged in users
  messages: [], // all the messages of the current chat
  messagesLoading: false,
  currentChat: null, // current chatting friend details
  currentChatId: null, // holds the current chat id
};

export const createChat = createAsyncThunk(
  "chat/create",
  async (participants, token) => {
    try {
      const response = await axios.post(
        "/api/chat/new-chat",
        {
          participants,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${userToken || token}`,
        //   },
        // }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchChats = createAsyncThunk(
  "chat/fetch",
  async (participantId) => {
    try {
      const response = await axios.post(
        "/api/chat/all-chats",
        {
          id: participantId,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // }
      );
      if (response.status === 200) return response.data.chats;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId) => {
    try {
      const response = await axios.get(
        `/api/chat/${chatId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // }
      );
      if (response.status === 200) {
        const messages = response.data.messages;
        return messages;
      }
    } catch (error) {
      console.log("Failed fetching the messages: ", error);
    }
  }
);

export const sendMessages = createAsyncThunk(
  "chat/sendMessage",
  async (chatDetails) => {
    try {
      const { sender, receiver, chatId, message } = chatDetails;
      const response = await axios.post(
        `/api/chat/send-message/${chatId}`,
        { sender, receiver, message }
        // {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // }
      );
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    currentChatWith: (state, action) => {
      state.currentChat = action.payload.receiverUserDetails;
      state.currentChatId = action.payload.chatId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChat.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchMessages.pending, (state, action) => {
        state.messagesLoading = true;
        state.messages = [];
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(sendMessages.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        // state.loading = false;
        // state.messages = action.payload;
      });
  },
});

export const { currentChatWith } = chatSlice.actions;
export default chatSlice.reducer;
