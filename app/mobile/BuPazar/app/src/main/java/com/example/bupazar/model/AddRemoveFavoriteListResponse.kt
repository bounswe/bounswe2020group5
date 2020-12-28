package com.example.bupazar.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable


data class AddRemoveFavoriteListResponse(
    @SerializedName("ok") val ok: Boolean?,
    @SerializedName("message") val message: String?,
    @SerializedName("data") val data: ProductsInFavoriteList,
) : Serializable

data class ProductsInFavoriteList(
    @SerializedName("products") val favoriteListProducts: Array<FavoriteListProduct>
) : Serializable

data class FavoriteListProduct(
    @SerializedName("product") val product: ProductDetails
) : Serializable