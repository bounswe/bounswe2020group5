package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class AllProductsResponse (
    @SerializedName("products") val all_products: Array<ProductDetails>?,
)