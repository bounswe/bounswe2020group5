/*
* Created by Sertay Akpinar
* A data class which keeps the request info for changing password endpoint.
 */
package com.example.bupazar.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class PasswordChangeRequest(
        @SerializedName("current_password") var currentPassword: String?,
        @SerializedName("new_password") var newPassword: String?,
) : Serializable
