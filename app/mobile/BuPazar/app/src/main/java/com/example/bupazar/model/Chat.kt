package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class Chat(
        @SerializedName("id") var chatId: Int?,
        @SerializedName("vendor_username") var vendorUsername: String?,
        @SerializedName("customer_username") var customerUsername: String?,
        @SerializedName("product_id") var productId: String?,
        @SerializedName("created_date") var createdDate: String?,
)
