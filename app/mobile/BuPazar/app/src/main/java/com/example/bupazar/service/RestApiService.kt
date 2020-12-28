package com.example.bupazar.service

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

    fun userVerificate(userData: VerificationRequest, onResult: (LoginResponse?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.userVerificate(userData).enqueue(
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

    fun addToCart(authToken: String, productData: AddToCartRequest, onResult: (AddToCartResponse?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.addToCart(authToken, productData).enqueue(
                object : Callback<AddToCartResponse> {
                    override fun onFailure(call: Call<AddToCartResponse>, t: Throwable) {
                        onResult(null)
                    }

                    override fun onResponse(call: Call<AddToCartResponse>, response: Response<AddToCartResponse>) {
                        val addToCartResponse = response.body()
                        onResult(addToCartResponse)
                    }
                }
        )
    }

    fun getCart(authToken: String, onResult: (ProductsInCart?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getCart(authToken).enqueue(
            object : Callback<ProductsInCart> {
                override fun onFailure(call: Call<ProductsInCart>, t: Throwable) {
                    onResult(null)
                }

                override fun onResponse(call: Call<ProductsInCart>, response: Response<ProductsInCart>) {
                    val addToCartResponse = response.body()
                    onResult(addToCartResponse)

                }
            }
        )
    }

    fun addToFavoriteList(authToken: String, productData: AddRemoveFavoriteListRequest, onResult: (AddRemoveFavoriteListResponse?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.addToFavoriteList(authToken, productData).enqueue(
            object : Callback<AddRemoveFavoriteListResponse> {
                override fun onFailure(call: Call<AddRemoveFavoriteListResponse>, t: Throwable) {
                    onResult(null)
                }

                override fun onResponse(call: Call<AddRemoveFavoriteListResponse>, response: Response<AddRemoveFavoriteListResponse>) {
                    val addToFavoriteListResponse = response.body()
                    onResult(addToFavoriteListResponse)
                }
            }
        )
    }

    fun removeFromFavoriteList(authToken: String, productData: AddRemoveFavoriteListRequest, onResult: (AddRemoveFavoriteListResponse?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.removeFromFavoriteList(authToken, productData).enqueue(
            object : Callback<AddRemoveFavoriteListResponse> {
                override fun onFailure(call: Call<AddRemoveFavoriteListResponse>, t: Throwable) {
                    onResult(null)
                }

                override fun onResponse(call: Call<AddRemoveFavoriteListResponse>, response: Response<AddRemoveFavoriteListResponse>) {
                    val addToFavoriteListResponse = response.body()
                    onResult(addToFavoriteListResponse)
                }
            }
        )
    }

    fun getFavoriteList(authToken: String, onResult: (ProductsInFavoriteList?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getFavoriteList(authToken).enqueue(
            object : Callback<ProductsInFavoriteList> {
                override fun onFailure(call: Call<ProductsInFavoriteList>, t: Throwable) {
                    onResult(null)
                }

                override fun onResponse(call: Call<ProductsInFavoriteList>, response: Response<ProductsInFavoriteList>) {
                    val addToFavoriteListResponse = response.body()
                    onResult(addToFavoriteListResponse)

                }
            }
        )
    }

    fun productDetails(id: Long, onResult: (ProductDetails?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.productDetails(id).enqueue(
                object : Callback<ProductDetails> {
                    override fun onFailure(call: Call<ProductDetails>, t: Throwable) {
                        onResult(null)
                    }

                    override fun onResponse(call: Call<ProductDetails>, response: Response<ProductDetails>) {
                        val user = response.body()
                        onResult(user)
                    }
                }
        )
    }

    fun allProducts(onResult: (Array<ProductDetails>?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.allProducts().enqueue(
                object : Callback<Array<ProductDetails>?> {
                    override fun onFailure(call: Call<Array<ProductDetails>?>, t: Throwable) {
                        onResult(null)
                    }

                    override fun onResponse(call: Call<Array<ProductDetails>?>, response: Response<Array<ProductDetails>?>) {
                        val all_products = response.body()
                        onResult(all_products)
                    }
                }
        )
    }
}
