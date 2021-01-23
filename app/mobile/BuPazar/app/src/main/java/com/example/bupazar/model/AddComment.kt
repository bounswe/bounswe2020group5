package com.example.bupazar.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class AddComment(
        @SerializedName("product_id") var productId: Long?,
        @SerializedName("comment_text") var commentText: String?,
        @SerializedName("is_anonymous") var isAnonymous: Boolean?,
        @SerializedName("rating_score") var rate: Int?,
) : Serializable
