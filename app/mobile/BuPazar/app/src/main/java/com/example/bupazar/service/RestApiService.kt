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

    fun googleLogin(authTokenRequest: AuthTokenRequest, onResult: (LoginResponse?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.googleLogin(authTokenRequest).enqueue(
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
  
    fun getCreditCards(authToken: String, onResult: (Array<CreditCard>?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getCreditCards(authToken).enqueue(
            object : Callback<Array<CreditCard>?> {
                override fun onFailure(call: Call<Array<CreditCard>?>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<Array<CreditCard>?>, response: Response<Array<CreditCard>?>) {
                    val creditCards = response.body()
                    onResult(creditCards)
                }
            }
        )
    }

    fun makePurchase(authToken: String, onResult: (Success?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.makePurchase(authToken).enqueue(
                object : Callback<Success> {
                    override fun onFailure(call: Call<Success>, t: Throwable) {
                        onResult(null)
                    }
                    override fun onResponse(call: Call<Success>, response: Response<Success>) {
                        val successResponse = response.body()
                        onResult(successResponse)
                    }
                }
        )
    }

    fun addCreditCard(authToken: String, addCreditCardRequest: AddCreditCardRequest, onResult: (Success?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.addCreditCard(authToken, addCreditCardRequest).enqueue(
            object : Callback<Success> {
                override fun onFailure(call: Call<Success>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<Success>, response: Response<Success>) {
                    val successResponse = response.body()
                    onResult(successResponse)
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

    fun getFavoriteList(onResult: (ProductsInFavoriteList?) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getFavoriteList("Token " + User.authToken).enqueue(
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

    fun allComments(commentRequest: CommentRequest, onResult: (Array<CommentDetails>?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.allComments(commentRequest).enqueue(
                object : Callback<Array<CommentDetails>?>{
                    override fun onFailure(call: Call<Array<CommentDetails>?>, t: Throwable) {
                        onResult(null)
                    }

                    override fun onResponse(call: Call<Array<CommentDetails>?>, response: Response<Array<CommentDetails>?>) {
                        val allComments = response.body()
                        onResult(allComments)
                    }
                }
        )
    }




    fun forgotPassword(userMail: ForgotPasswordRequest, onResult: (ForgotPasswordRequest?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.forgotPassword(userMail).enqueue(
            object : Callback<ForgotPasswordRequest> {
                override fun onFailure(call: Call<ForgotPasswordRequest>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<ForgotPasswordRequest>, response: Response<ForgotPasswordRequest>) {
                    val user = response.body()
                    onResult(user)
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

    fun editProfileInfo(userData: EditPersonalInfoRequest, onResult: (Success?) -> Unit) {
        if(userData.userName.equals(User.userName))
                userData.userName = null
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.editProfileInfo("Token ${User.authToken}", userData).enqueue(
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

    fun getPreviousOrders(authToken: String, onResult: (Array<Order>?) -> Unit){
        val retrofit = ServiceBuilder.buildService(RestApi::class.java)
        retrofit.getPreviousOrders(authToken).enqueue(
            object : Callback<Array<Order>?> {
                override fun onFailure(call: Call<Array<Order>?>, t: Throwable) {
                    onResult(null)
                }
                override fun onResponse(call: Call<Array<Order>?>, response: Response<Array<Order>?>) {
                    val orders = response.body()
                    onResult(orders)
                }
            }
        )
    }
}
