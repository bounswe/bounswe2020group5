package com.example.bupazar.`interface`

import com.example.bupazar.model.LoginRequest
import com.example.bupazar.model.LoginResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST

interface RestApi {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login/")
    fun addUser(@Body userData: LoginRequest): Call<LoginRequest>
}