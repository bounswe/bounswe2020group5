/*
* Created by Sertay Akpinar
* Fragment class to let the user to review the products of a specific subcategory.
*/
package com.example.bupazar.page.fragment.categories

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.HomepageProductAdapter
import com.example.bupazar.model.ProductDetails
import com.example.bupazar.model.SubCategoryRequest
import com.example.bupazar.page.fragment.ProductFragment
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_homepage.*


class SubCategoryProductsFragment : Fragment() {

    var subCategoryRequest: SubCategoryRequest? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_spesific_products, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val apiService = RestApiService()
        subCategoryRequest?.let {
            apiService.subCategoryProducts(it) {
                if (it != null) {
                    if (it.isEmpty()) {
                        Toast.makeText(this.activity, "There are no available products.\n", Toast.LENGTH_SHORT).show()
                    } else {
                        val products: Array<ProductDetails> = it
                        val productAdapter = this.context?.let { HomepageProductAdapter(it, products) }
                        rvProducts.adapter = productAdapter
                        rvProducts.layoutManager = GridLayoutManager(this.context, 2)
                        productAdapter!!.onItemClick = { product ->
                            requireActivity().supportFragmentManager.beginTransaction().apply {
                                replace(R.id.fl_wrapper, ProductFragment.newInstance(User.authToken, product.productId!!))
                                commit()
                            }
                        }
                    }
                }
            }
        }
    }

    companion object {
        @JvmStatic fun newInstance() = SubCategoryProductsFragment().apply {
            arguments = Bundle().apply {

            }
        }
    }
}