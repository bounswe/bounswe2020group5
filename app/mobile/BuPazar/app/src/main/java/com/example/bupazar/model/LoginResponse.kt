package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class LoginResponse(
    @SerializedName("email") val userEmail: String?,
)