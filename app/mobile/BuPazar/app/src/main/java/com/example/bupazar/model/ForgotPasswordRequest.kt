package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class ForgotPasswordRequest (
        @SerializedName("email") val userMail: String?,
)