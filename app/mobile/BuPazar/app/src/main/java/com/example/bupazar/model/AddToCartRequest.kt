package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class AddToCartRequest(
    @SerializedName("product_id") val productId: Long?,
    @SerializedName("count") val count: Int?,
)