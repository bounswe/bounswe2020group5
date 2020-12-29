package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class ChatCreateRequest(
        @SerializedName("vendor_username") val vendorUsername: String?,
)