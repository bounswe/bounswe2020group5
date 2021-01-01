package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class ChatCreateResponse(
        @SerializedName("chat_id") val chatId: Int?,
        @SerializedName("success") val success: String?,
)