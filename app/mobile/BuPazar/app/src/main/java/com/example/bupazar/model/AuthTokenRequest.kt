package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class AuthTokenRequest (
        @SerializedName("auth_token") val authToken: String?,
)