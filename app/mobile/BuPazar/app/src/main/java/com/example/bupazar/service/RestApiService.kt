package com.example.bupazar.service

import com.example.bupazar.`interface`.RestApi
import com.example.bupazar.model.LoginRequest
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit

class RestApiService {
    fun addUser(userData: LoginRequest, onResult: (LoginRequest?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.addUser(userData).enqueue(
            object : Callback<LoginRequest> {
                override fun onFailure(call: Call<LoginRequest>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse( call: Call<LoginRequest>, response: Response<LoginRequest>) {
                    val addedUser = response.body()
                    onResult(addedUser)
                }
            }
        )
    }
}