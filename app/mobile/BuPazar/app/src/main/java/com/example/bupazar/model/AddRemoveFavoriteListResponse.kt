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
        @SerializedName("id") val productId: Long?,
        @SerializedName("name") val name: String?,
        @SerializedName("price") val price: Float?,
        @SerializedName("description") val description: String?,
        @SerializedName("image_url") val imageUrl: String?,
        @SerializedName("category") val category: String?,
        @SerializedName("brand") val brand: String?,
        @SerializedName("vendor") val vendor: String?,
        @SerializedName("stock") val stock: Long?,
        @SerializedName("number_of_sales") val numberOfSales: Long?,
        @SerializedName("rating") val rating: Number?) : Serializable