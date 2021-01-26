package com.example.bupazar.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class NotificationResponse(
    @SerializedName("id") val id: Int?,
    @SerializedName("text") val notificationText: String,
    @SerializedName("notificationType") val type: String?,
    @SerializedName("user") val user: String?,
    @SerializedName("createdAt") val date: String?,
    @SerializedName("product") val product: ProductDetails,
    @SerializedName("order") val order: Int?,
    @SerializedName("isSeen") val is_seen: Boolean?,
) : Serializable