package com.example.bupazar.model;

import com.google.gson.annotations.SerializedName;

data class ChatRequest (
    @SerializedName("chat_id") var chatId: String?,
    @SerializedName("context") var content: String?
)
