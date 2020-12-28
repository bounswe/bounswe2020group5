package com.example.bupazar.service

import com.example.bupazar.User
import com.example.bupazar.`interface`.RestApi
import com.example.bupazar.model.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RestApiService {
    fun userLogin(userData: LoginRequest, onResult: (LoginResponse?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.userLogin(userData).enqueue(
            object : Callback<LoginResponse> {
                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                    val user = response.body()
                    onResult(user)
                }
            }
        )
    }

  fun userRegister(userData: RegisterRequest, onResult: (Success?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.userRegister(userData).enqueue(
            object : Callback<Success> {
                override fun onFailure(call: Call<Success>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<Success>, response: Response<Success>) {
                    val user = response.body()
                    onResult(user)
                }
            }
        )
    }

    fun productDetails(id: Long, onResult: (ProductDetails?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.productDetails(id).enqueue(
            object : Callback<ProductDetails> {
                override fun onFailure(call: Call<ProductDetails>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse( call: Call<ProductDetails>, response: Response<ProductDetails>) {
                    val user = response.body()
                    onResult(user)
                }
            }
        )
    }

  fun allProducts(onResult: (Array<ProductDetails>?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.allProducts().enqueue(
            object : Callback<Array<ProductDetails>?> {
                override fun onFailure(call: Call<Array<ProductDetails>?>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse( call: Call<Array<ProductDetails>?>, response: Response<Array<ProductDetails>?>) {
                    val all_products = response.body()
                    onResult(all_products)
                }
            }
        )
    }


    fun sendMessage(authToken : String, chatRequest: ChatRequest, onResult: (Success?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.sendMessage("Token $authToken", chatRequest).enqueue(
                object : Callback<Success> {
                    override fun onFailure(call: Call<Success>, t: Throwable) {
                        onResult(null)
                    }
                    override fun onResponse( call: Call<Success>, response: Response<Success>) {
                        val success = response.body()
                        onResult(success)
                    }
                }
        )
    }

    fun getLastMessage(authToken : String, chatRequest : ChatRequest, onResult: (Message?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getLastMessage("Token $authToken", chatRequest).enqueue(
            object : Callback<Message> {
                override fun onFailure(call: Call<Message>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse( call: Call<Message>, response: Response<Message>) {
                    val message = response.body()
                    onResult(message)
                }
            }
        )
    }

    fun getAllChats(onResult: (Array<Chat>?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getAllChats("Token ${User.authToken}").enqueue(
                object : Callback<Array<Chat>?> {
                    override fun onFailure(call: Call<Array<Chat>?>, t: Throwable) {
                        onResult(null)
                    }
                    override fun onResponse( call: Call<Array<Chat>?>, response: Response<Array<Chat>?>) {
                        val allChats = response.body()
                        onResult(allChats)
                    }
                }
        )
    }

    fun chatCreate(chatCreateRequest: ChatCreateRequest, onResult: (ChatCreateResponse?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.createChat("Token ${User.authToken}", chatCreateRequest).enqueue(
                object : Callback<ChatCreateResponse> {
                    override fun onFailure(call: Call<ChatCreateResponse>, t: Throwable) {
                        onResult(null)
                    }
                    override fun onResponse( call: Call<ChatCreateResponse>, response: Response<ChatCreateResponse>) {
                        val allChats = response.body()
                        onResult(allChats)
                    }
                }
        )
    }
}
