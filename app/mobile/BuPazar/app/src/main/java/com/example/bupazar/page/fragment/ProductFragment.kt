package com.example.bupazar.page.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Spinner
import androidx.fragment.app.Fragment
import com.example.bupazar.R
import com.example.bupazar.service.RestApiService
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.fragment_product.*


private const val ARG_PRODUCT_ID = "productId"

class ProductFragment : Fragment() {
    private var productId: Long = 0


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_product, container, false)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
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
                price_text.text =  "\$ " + it.price.toString()
                product_description_text.text = it.description
                Picasso.with(context)
                    .load(it.imageUrl)
                    .into(productImageView);
            }
        }
    }

    companion object {
        @JvmStatic
        fun newInstance(productId: Long) =
            ProductFragment().apply {
                arguments = Bundle().apply {
                    putLong(ARG_PRODUCT_ID, productId)
                }
            }
    }
}