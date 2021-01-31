/*
* Created by Sertay Akpinar
* A data class which keeps the request info for update personal info endpoint.
 */
package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class EditPersonalInfoRequest(
        @SerializedName("username") var userName: String?,
        @SerializedName("first_name") val userFirstName: String?,
        @SerializedName("last_name") val userLastName: String?,
        @SerializedName("address") val userAddress: String?,
)