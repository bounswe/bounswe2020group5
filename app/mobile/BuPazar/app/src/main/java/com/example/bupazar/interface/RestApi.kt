package com.example.bupazar.`interface`

import com.example.bupazar.model.LoginRequest
import com.example.bupazar.model.ProductDetails
import com.example.bupazar.model.RegisterRequest

import com.example.bupazar.model.*
import retrofit2.Call
import retrofit2.http.*

interface RestApi {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login/")
    fun userLogin(@Body userData: LoginRequest): Call<LoginResponse>

    @Headers("Content-Type: application/json")
    @POST("/api/auth/register/")
    fun userRegister(@Body userData: RegisterRequest): Call<Success>

    @Headers("Content-Type: application/json")
    @POST("/api/auth/register_activate/")
    fun userVerificate(@Body userData: VerificationRequest): Call<LoginResponse>

    @Headers("Content-Type: application/json")
    @GET("/api/products/{id}")
    fun productDetails(@Path("id") id: Long): Call<ProductDetails>

    @Headers("Content-Type: application/json")
    @GET("/api/products/")
    fun allProducts(): Call<Array<ProductDetails>?>
}