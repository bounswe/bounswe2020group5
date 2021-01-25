package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class CommentDetails (
    @SerializedName("id") val commentId: Int,
    @SerializedName("customer") val customerName: String,
    @SerializedName("product") val productId: ProductDetails,
    @SerializedName("comment_text") val comment: String,
    @SerializedName("rating_score") val rate: Int,
    @SerializedName("is_anonymous") val isAnonymous: Boolean,
)