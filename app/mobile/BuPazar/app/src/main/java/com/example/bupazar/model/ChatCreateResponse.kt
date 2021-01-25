package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class ChatCreateResponse(
        @SerializedName("chat") val chat: Chat?,
        @SerializedName("success") val success: String?,
)