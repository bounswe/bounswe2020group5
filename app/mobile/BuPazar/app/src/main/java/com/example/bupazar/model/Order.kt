package com.example.bupazar.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Order(
    @SerializedName("order_id") val order_id: Long?,
    @SerializedName("purchases") val purchases: Array<Purchase>?,
    @SerializedName("data") val data: ProductsInCart,
) : Serializable

data class Purchase(
    @SerializedName("id") val id: Long?,
    @SerializedName("customer") val customer: Long?,
    @SerializedName("vendor") val vendor: Long?,
    @SerializedName("product") val product: ProductDetails?,
    @SerializedName("amount") val amount: Long?,
    @SerializedName("unit_price") val unit_price: Float?,
    @SerializedName("status") val status: String?,
) : Serializable