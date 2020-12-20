package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class LoginResponse(
    @SerializedName("email") val userEmail: String?,
    @SerializedName("id") val id: Int?,
    @SerializedName("username") val userName: String?,
    @SerializedName("first_name") val firstName: String?,
    @SerializedName("last_name") val lastName: String?,
    @SerializedName("is_customer") val isCustomer: Boolean?,
    @SerializedName("is_vendor") val isVendor: Boolean?,
    @SerializedName("is_active") val isActive: Boolean?,
    @SerializedName("is_staff") val isStaff: Boolean?,
    @SerializedName("address") val address: String?,
    @SerializedName("auth_token") val authToken: String?,
)