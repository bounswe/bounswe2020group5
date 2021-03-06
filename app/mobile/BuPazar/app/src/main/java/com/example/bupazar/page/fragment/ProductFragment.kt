package com.example.bupazar.page.fragment

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.NumberPicker
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.bupazar.R
import com.example.bupazar.model.*
import com.example.bupazar.page.activity.message.ChatActivity
import com.example.bupazar.service.RestApiService
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.fragment_product.*


private const val ARG_PRODUCT_ID = "productId"
private const val ARG_AUTH_TOKEN = "authToken"

class ProductFragment : Fragment() {

    private var authToken: String? = null
    private var productId: Long = 0
    private var addedToCart: Boolean = false
    private var addedToFavoriteList: Boolean = false
    private var quantityAdded: Int = 1
    private lateinit var picker1: NumberPicker

    private lateinit var rcView: RecyclerView

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_product, container, false)
    }

    @SuppressLint("ResourceAsColor")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
            authToken = it.getString(ARG_AUTH_TOKEN)
            authToken = "Token " + authToken
            productId = it.getLong(ARG_PRODUCT_ID)
        }



        val apiService = RestApiService()
        apiService.productDetails(productId){
            if(it?.name == null){

            }
            else {
                product_name_text.text = it.name
                product_vendor_text.text = "Vendor: " + it.vendor
                product_brand_text.text = it.brand
                price_text.text = "$" + "%.2f".format(it.price)
                product_description_text.text = it.description
                Picasso.with(context)
                    .load(it.imageUrl)
                    .into(productImageView);

                var vendorUsername = it.vendor
                var productId = it.productId
                product_vendor_text.setOnClickListener() {
                    val chatCreateRequest = ChatCreateRequest(
                        productId,
                        vendorUsername
                    )
                    apiService.chatCreate(chatCreateRequest) {
                        if(it?.chat?.chatId != null) {
                            //                    createChats() // Uncomment it if you wanna update the chat list before changing the intent
                            var intent = Intent(this.activity, ChatActivity::class.java)
                            intent.putExtra("chatId", it.chat.chatId)
                            startActivity(intent)
                        }
                    }
                }
            }
        }

        apiService.getCart(authToken!!){
            if (it == null) {

            }
            else {
                var productsInCart = it.cartProducts
                for (cartProduct in productsInCart.iterator()) {
                    if (cartProduct.product.productId == productId) {
                        addtocart_text.setText("REMOVE FROM CART")
                        this.context?.let { it1 ->
                            ContextCompat.getColor(
                                    it1,
                                    R.color.secondary_blue
                            )
                        }?.let { it2 ->
                            addtocart.setBackgroundColor(
                                    it2
                            )

                        }
                        change_quantity_box.visibility = View.INVISIBLE
                        addedToCart = true
                    }
                }
            }
        }
        apiService.getFavoriteList(){
             if (it == null) {

            }
            else {
                 var productsInFavoriteList = it.favoriteListProducts

                 if (productsInFavoriteList.size > 0) {
                     for (favoriteListProduct in productsInFavoriteList.iterator()) {
                         if (favoriteListProduct.productId == productId) {
                             addToWishList.setText("Remove from Wishlist")
                             addToWishList.setCompoundDrawablesWithIntrinsicBounds(R.drawable.ic_baseline_star_24, 0, 0, 0);
                             addedToFavoriteList = true
                         }
                     }
                 }
             }
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rcView = view.findViewById(R.id.rvComments)
        picker1 = view.findViewById(R.id.ratePicker)
        picker1.maxValue = 5
        picker1.minValue = 1

        val apiService = RestApiService()

        addToWishList.setOnClickListener {
            val productData = AddRemoveFavoriteListRequest(
                    productId = this.productId
            )
            if (addedToFavoriteList) {
                authToken?.let { it1 ->
                    apiService.removeFromFavoriteList(it1, productData) {
                        addToWishList.setText("Add to Wishlist")
                        addToWishList.setCompoundDrawablesWithIntrinsicBounds(R.drawable.fav, 0, 0, 0)
                        addedToFavoriteList = false
                    }
                }
            }
            else {
                authToken?.let { it1 ->
                    apiService.addToFavoriteList(it1, productData) {
                        addToWishList.setText("Remove from Wishlist")
                        addToWishList.setCompoundDrawablesWithIntrinsicBounds(R.drawable.ic_baseline_star_24, 0, 0, 0)
                        addedToFavoriteList = true
                    }
                }
            }
        }
        addCommentView.setOnClickListener (){
            if (commentEditTextView.text.isEmpty()){
                Toast.makeText(this.activity, "Please write a comment", Toast.LENGTH_SHORT).show()
            }
            else {
                val apiService = RestApiService()
                val commentInfo = AddComment(
                        productId = this.productId,
                        commentText = commentEditTextView.text.toString(),
                        isAnonymous = false,
                        rate = picker1.value
                )
                apiService.addComment(commentInfo){
                    if(it?.success == null){
                        Toast.makeText(this.activity, "Comment is not able to added. You have to purchase the product.", Toast.LENGTH_SHORT).show()
                    }
                    else{
                        Toast.makeText(this.activity, "Comment is added.", Toast.LENGTH_SHORT).show()
                        val commentRequest = CommentRequest(
                                productId = this.productId
                        )
                        apiService.allComments(commentRequest) {
                            if (it == null){

                            }
                            else {
                                val comments: Array<CommentDetails> = it
                                rcView.layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
                                rcView.adapter = CommentAdapter(comments)
                            }
                        }
                    }
                }
            }

        }

        /*
        * Add to cart button on click listener implementation.
        * When pressed by the user, this product will be added to the cart, for the chosen number of quantity.
         */
        addtocart.setOnClickListener {
            if (addedToCart) {
                val productData = AddToCartRequest(
                        productId = this.productId,
                        count = 0
                )
                authToken?.let { it1 ->
                    apiService.addToCart(it1, productData) {
                        this.context?.let { it1 -> ContextCompat.getColor(it1, R.color.black) }?.let { it2 ->
                            addtocart.setBackgroundColor(
                                    it2
                            )
                        }
                        addtocart_text.setText("ADD TO CART")
                        addedToCart = false
                        change_quantity_box.visibility = View.VISIBLE
                        quantityAdded = 1
                    }
                }
            }
            else {
                val productData = AddToCartRequest(
                        productId = this.productId,
                        count = quantityAdded
                )
                authToken?.let { it1 ->
                    apiService.addToCart(it1, productData) {
                        this.context?.let { it1 ->
                            ContextCompat.getColor(
                                    it1,
                                    R.color.secondary_blue
                            )
                        }?.let { it2 ->
                            addtocart.setBackgroundColor(
                                    it2
                            )
                        }
                        addtocart_text.setText("REMOVE FROM CART")
                        addedToCart = true
                        change_quantity_box.visibility = View.INVISIBLE
                    }
                }
            }
        }

        /*
        * Increase quantity button on click listener implementation.
        * Increase quantity by one, increase the global variable and show the increased quantity to user.
         */
        increase_quantity_button.setOnClickListener {
            quantityAdded += 1
            quantity_text.setText(quantityAdded.toString())
        }
        /*
        * Same implementation as above.
         */
        decrease_quantity_button.setOnClickListener {
            if (quantityAdded > 1) {
                quantityAdded -= 1
                quantity_text.setText(quantityAdded.toString())
            }
        }



        val commentRequest = CommentRequest(
                productId = this.productId
        )
        apiService.allComments(commentRequest) {
            if (it == null){

            }
            else {
                val comments: Array<CommentDetails> = it
                rcView.layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
                rcView.adapter = CommentAdapter(comments)
            }
        }
    }

    companion object {
        @JvmStatic
        fun newInstance(authToken: String?, productId: Long) =
            ProductFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_AUTH_TOKEN, authToken)
                    putLong(ARG_PRODUCT_ID, productId)
                }
            }
    }
}

