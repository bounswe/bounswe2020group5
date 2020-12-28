package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class CommentRequest(
        @SerializedName("product_id") val productId: Long,
)