package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class GetLastMessageResponse(
        @SerializedName("chat") val chat: Message?,
        @SerializedName("success") val success: String?,
)
