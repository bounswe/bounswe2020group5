package com.example.bupazar.model

import android.text.Editable
import com.google.gson.annotations.SerializedName


data class LoginRequest(
    @SerializedName("email") val userEmail: String?,
    @SerializedName("password") val userPassword: String?,
)