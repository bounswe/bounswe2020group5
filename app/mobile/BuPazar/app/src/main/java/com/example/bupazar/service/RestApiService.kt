package com.example.bupazar.service

import com.example.bupazar.`interface`.RestApi
import com.example.bupazar.model.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit

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
}
