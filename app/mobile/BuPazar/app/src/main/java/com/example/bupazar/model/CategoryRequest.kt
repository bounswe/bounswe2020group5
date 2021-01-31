/*
* Created by Sertay Akpinar
* A data class which keeps the category request info including "category_name".
 */
package com.example.bupazar.model

import com.google.gson.annotations.SerializedName


data class CategoryRequest (
    @SerializedName("category_name") val CategoryName: String?,
)