package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class VerificationRequest(
    @SerializedName("email") val userEmail: String?,
    @SerializedName("number") val verificationNumber: String?,
)