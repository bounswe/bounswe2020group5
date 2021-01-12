package com.example.bupazar.model

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class CreditCard(
    @SerializedName("id") val id: Long?,
    @SerializedName("name") val name: String?,
    @SerializedName("customer") val customer: Long?,
    @SerializedName("card_owner") val cardOwner: String?,
    @SerializedName("card_number") val cardNumber: String?,
    @SerializedName("expiration_date") val expirationDate: String?,
    @SerializedName("cvc_security_number") val cvc: String?
) : Serializable