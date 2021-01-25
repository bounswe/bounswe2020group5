package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class FeaturedProductsValue (
    @SerializedName("newest_arrivals") val newestArrivals: Array<ProductDetails>,
    @SerializedName("best_sellers") val bestSellers: Array<ProductDetails>,
    @SerializedName("trends") val trends: Array<ProductDetails>,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as FeaturedProductsValue

        if (!newestArrivals.contentEquals(other.newestArrivals)) return false
        if (!bestSellers.contentEquals(other.bestSellers)) return false
        if (!trends.contentEquals(other.trends)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = newestArrivals.contentHashCode()
        result = 31 * result + bestSellers.contentHashCode()
        result = 31 * result + trends.contentHashCode()
        return result
    }
}