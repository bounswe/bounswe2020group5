package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class GetLastMessageResponse(
        @SerializedName("message") val message: Message?,
        @SerializedName("success") val success: String?,
)
