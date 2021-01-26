package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

// A data class to hold the body parameters for the API request to change the status of an order
data class UpdateStatusRequest (
    @SerializedName("purchase_id") val purchase_id: Long?,
    @SerializedName("status") val status: String?,
)