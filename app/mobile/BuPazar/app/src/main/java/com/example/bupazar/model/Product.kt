package com.example.bupazar.model

data class Product (val name: String, val description: String, val productNo: Int){
    val imageUrl = "https://picsum.photos/150?random=$productNo"
}