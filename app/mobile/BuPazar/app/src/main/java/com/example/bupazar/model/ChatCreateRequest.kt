package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class ChatCreateRequest(
        @SerializedName("product_id") val productID: Long?,
        @SerializedName("vendor_username") val vendorUsername: String?,
)