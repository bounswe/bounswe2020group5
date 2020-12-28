package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class AddRemoveFavoriteListRequest(
    @SerializedName("product_id") val productId: Long?,
)