package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.*
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_favorites.*


class FavoritesFragment : Fragment() {
    private var userData: LoginResponse? = null
    private var authToken: String? = null
    private var productsInFavoriteList: Array<FavoriteListProduct>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userData = arguments?.getSerializable("USERDATA") as LoginResponse
        }
        authToken = userData?.authToken
        authToken = "Token " + authToken

        val apiService = RestApiService()
        apiService.getFavoriteList(){
            if (it == null) {

            }
            else {
                productsInFavoriteList = it.favoriteListProducts
                val favoriteListProductAdapter = this.context?.let { productsInFavoriteList?.let { it1 -> FavoriteListProductAdapter(it, favoriteListProducts = it1) } }
                wishListProducts.adapter = favoriteListProductAdapter
                wishListProducts.layoutManager = LinearLayoutManager(this.context)

            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_favorites, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val favoriteListProductAdapter = this.context?.let { productsInFavoriteList?.let { it1 -> FavoriteListProductAdapter(it, favoriteListProducts = it1) } }
        wishListProducts.adapter = favoriteListProductAdapter
        wishListProducts.layoutManager = LinearLayoutManager(this.context)
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            FavoritesFragment().apply {
                arguments = Bundle().apply {
                }
            }
    }
}