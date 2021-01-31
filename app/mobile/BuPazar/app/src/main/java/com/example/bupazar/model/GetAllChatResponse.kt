package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class GetAllChatResponse(
        @SerializedName("chats") val chats: Array<Chat>?,
        @SerializedName("success") val success: String?,
)
