package com.example.bupazar.service

import com.example.bupazar.`interface`.RestApi
import com.example.bupazar.model.LoginRequest
import com.example.bupazar.model.RegisterRequest
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit

class RestApiService {
    fun userLogin(userData: LoginRequest, onResult: (LoginRequest?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.userLogin(userData).enqueue(
            object : Callback<LoginRequest> {
                override fun onFailure(call: Call<LoginRequest>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse( call: Call<LoginRequest>, response: Response<LoginRequest>) {
                    val user = response.body()
                    onResult(user)
                }
            }
        )
    }
    fun userRegister(userData: RegisterRequest, onResult: (RegisterRequest?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.userRegister(userData).enqueue(
            object : Callback<RegisterRequest> {
                override fun onFailure(call: Call<RegisterRequest>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse( call: Call<RegisterRequest>, response: Response<RegisterRequest>) {
                    val user = response.body()
                    onResult(user)
                }
            }
        )
    }}