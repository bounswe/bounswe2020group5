package com.example.bupazar.`interface`

import com.example.bupazar.model.LoginRequest
import com.example.bupazar.model.ProductDetails
import com.example.bupazar.model.RegisterRequest
import retrofit2.Call
import retrofit2.http.*

interface RestApi {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login/")
    fun userLogin(@Body userData: LoginRequest): Call<LoginRequest>

    @Headers("Content-Type: application/json")
    @POST("/api/auth/register/")
    fun userRegister(@Body userData: RegisterRequest): Call<RegisterRequest>

    @Headers("Content-Type: application/json")
    @GET("/api/products/{id}")
    fun productDetails(@Path("id") id: Long): Call<ProductDetails>
}