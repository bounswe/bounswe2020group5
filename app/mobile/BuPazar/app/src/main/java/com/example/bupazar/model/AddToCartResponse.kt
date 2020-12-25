package com.example.bupazar.model

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class AddToCartResponse(
    @SerializedName("ok") val ok: Boolean?,
    @SerializedName("message") val message: String?,
    @SerializedName("data") val data: ProductsInCart,
) : Serializable

data class ProductsInCart(
    @SerializedName("products_in_cart") val productsInCart: Array<ProductDetails>?
) : Serializable