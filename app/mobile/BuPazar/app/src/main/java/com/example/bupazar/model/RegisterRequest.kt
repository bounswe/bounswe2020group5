package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class RegisterRequest (
    @SerializedName("email") val userEmail: String?,
    @SerializedName("username") val username: String?,
    @SerializedName("first_name") val userFirstName: String?,
    @SerializedName("last_name") val userLastName: String?,
    @SerializedName("is_customer") val userIsCustomer: Boolean?,
    @SerializedName("is_vendor") val userIsVendor: Boolean?,
    @SerializedName("password") val userPassword: String?,
    @SerializedName("address") val userAddress: String?,
)