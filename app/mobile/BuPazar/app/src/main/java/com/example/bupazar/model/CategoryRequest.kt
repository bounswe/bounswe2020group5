package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class CategoryRequest (
    @SerializedName("category_name") val CategoryName: String?,
)