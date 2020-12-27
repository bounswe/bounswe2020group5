package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class EditPersonalInfoRequest(
    @SerializedName("email") val userEmail: String?,
    @SerializedName("username") val userName: String?,
    @SerializedName("first_name") val userFirstName: String?,
    @SerializedName("last_name") val userLastName: String?,
    @SerializedName("address") val userAddress: String?,
)