package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class SubCategoryRequest (
    @SerializedName("subcategory_name") val SubCategoryName: String?,
)