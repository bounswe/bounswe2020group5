package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class Chat(
        @SerializedName("id") var chatId: Int?,
        @SerializedName("vendor_id") var vendorUsername: String?,
        @SerializedName("customer_id") var customerUsername: String?,
)
