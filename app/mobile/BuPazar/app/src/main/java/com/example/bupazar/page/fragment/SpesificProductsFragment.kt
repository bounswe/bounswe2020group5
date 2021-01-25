package com.example.bupazar.page.fragment

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
import kotlinx.android.synthetic.main.fragment_spesific_products.*

class SpesificProductsFragment : Fragment() {

    var products: Array<ProductDetails>? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_spesific_products, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (!products!!.isEmpty()) {
            val productAdapter = this.context?.let { HomepageProductAdapter(this.requireContext(), products!!) }
            rvProducts.adapter = productAdapter
            rvProducts.layoutManager = GridLayoutManager(this.context, 2)
            productAdapter!!.onItemClick = { product ->
                requireActivity().supportFragmentManager.beginTransaction().apply {
                    replace(R.id.fl_wrapper,  ProductFragment.newInstance(User.authToken, product.productId!!))
                    commit()
                }
            }
        } else {
            Toast.makeText(this.activity,"There are no available products.", Toast.LENGTH_SHORT).show()
        }
    }



    companion object {
        @JvmStatic fun newInstance() =
                SpesificProductsFragment().apply {
                    arguments = Bundle().apply {
                    }
                }
    }
}