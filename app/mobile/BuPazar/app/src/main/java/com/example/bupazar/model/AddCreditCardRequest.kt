package com.example.bupazar.model

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class AddCreditCardRequest(
    @SerializedName("name") val name: String?,
    @SerializedName("card_owner") val cardOwner: String?,
    @SerializedName("card_number") val cardNumber: String?,
    @SerializedName("expiration_date") val expirationDate: String?,
    @SerializedName("cvc_security_number") val cvc: String?
) : Serializable