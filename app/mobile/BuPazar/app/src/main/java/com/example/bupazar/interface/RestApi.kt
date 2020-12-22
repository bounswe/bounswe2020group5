package com.example.bupazar.`interface`

import com.example.bupazar.model.*
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST

interface RestApi {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login/")
    fun userLogin(@Body userData: LoginRequest): Call<LoginRequest>

    @Headers("Content-Type: application/json")
    @POST("/api/auth/register/")
    fun userRegister(@Body userData: RegisterRequest): Call<RegisterRequest>

    @Headers("Content-Type: application/json")
    @GET("/api/products/")
    fun allProducts(): Call<Array<ProductDetails>?>
}