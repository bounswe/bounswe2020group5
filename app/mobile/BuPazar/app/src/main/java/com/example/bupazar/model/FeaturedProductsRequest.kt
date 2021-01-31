/*
* Created by Sertay Akpinar
* A data class which keeps the request info for featured products.
 */
package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class FeaturedProductsRequest (
    @SerializedName("number_of_products") var numberOfProducts: Int?,
)