package com.example.bupazar.page.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.FeaturedProductsRequest
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.model.HomepageProductAdapter
import com.example.bupazar.model.ProductDetails
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_homepage.*

class HomepageFragment : Fragment() {

    private var userData: LoginResponse? = null
    private val numberOfProducts = 12  // the number of products wanted to be shown in trending-bestsellers-new arrivals page

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_homepage, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val apiService = RestApiService()
        var newestArrivals: Array<ProductDetails>? = null
        var bestSellers: Array<ProductDetails>? = null
        var trends: Array<ProductDetails>? = null
        val featuredProductsRequest = FeaturedProductsRequest(
                numberOfProducts = numberOfProducts
        )

        if (User.authToken!= null) {
            recommended.visibility=View.VISIBLE
        }

        apiService.featuredProducts(featuredProductsRequest) {
            if (it != null) {
                newestArrivals = it.newestArrivals
                bestSellers = it.bestSellers
                trends= it.trends
            }
        }

        newArrivals.setOnClickListener() {
            val spesificProductsFragment = SpesificProductsFragment()
            spesificProductsFragment.products = newestArrivals
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  spesificProductsFragment)
                commit()
            }
        }

        bestSellersProducts.setOnClickListener() {
            val spesificProductsFragment = SpesificProductsFragment()
            spesificProductsFragment.products = bestSellers
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  spesificProductsFragment)
                commit()
            }
        }

        trending.setOnClickListener() {
            val spesificProductsFragment = SpesificProductsFragment()
            spesificProductsFragment.products = trends
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  spesificProductsFragment)
                commit()
            }
        }

        recommended.setOnClickListener() {
            User.authToken?.let { it1 ->
                apiService.recommendedProducts(it1) {
                    if (it == null) {

                    } else {
                        val products: Array<ProductDetails> = it
                        val spesificProductsFragment = SpesificProductsFragment()
                        spesificProductsFragment.products = products
                        requireActivity().supportFragmentManager.beginTransaction().apply {
                            replace(R.id.fl_wrapper,  spesificProductsFragment)
                            commit()
                        }
                    }
                }
            }
        }

        apiService.allProducts {
            if (it == null) {

            }
            else {
                val products: Array<ProductDetails> = it
                val productAdapter = this.context?.let { HomepageProductAdapter(it, products) }
                rvProducts.adapter = productAdapter
                rvProducts.layoutManager = GridLayoutManager(this.context, 2)
                productAdapter!!.onItemClick = { product ->
                    requireActivity().supportFragmentManager.beginTransaction().apply {
                        replace(R.id.fl_wrapper,  ProductFragment.newInstance(User.authToken, product.productId!!))
                        commit()
                    }
                }

                searchBarSearchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
                    override fun onQueryTextSubmit(query: String?): Boolean {
                        return false
                    }

                    override fun onQueryTextChange(query: String?): Boolean {
                        productAdapter.filter.filter(query)
                        if (User.authToken != null && query != null) {
                            apiService.searchQuery(authToken = User.authToken!!, query) {
                            }
                        }
                        return false
                    }
                })
            }
        }

    }

    companion object {
        @JvmStatic fun newInstance() =
                HomepageFragment().apply {
                    arguments = Bundle().apply {
                    }
                }

    }
}