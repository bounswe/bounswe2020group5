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
    @GET("/api/products/{id}")
    fun productDetails(@Path("id") id: Long): Call<ProductDetails>

    @Headers("Content-Type: application/json")
    @GET("/api/products/")
    fun allProducts(): Call<Array<ProductDetails>?>

    @Headers("Content-Type: application/json")
    @POST("/api/chats/send_message/")
    fun sendMessage(@Header("Authorization") authToken: String, @Body chatRequest: ChatRequest): Call<Success>

    @Headers("Content-Type: application/json")
    @POST("/api/chats/get_last_message/")
    fun getLastMessage(@Header("Authorization") authToken: String, @Body chatRequest: ChatRequest): Call<Message>

    @Headers("Content-Type: application/json")
    @POST("/api/chats/get_all_chats/")
    fun getAllChats(@Header("Authorization") authToken: String): Call<Array<Chat>?>

    @Headers("Content-Type: application/json")
    @POST("/api/chats/create_chat/")
    fun createChat(@Header("Authorization") authToken: String, @Body chatCreateRequest: ChatCreateRequest): Call<ChatCreateResponse>
}