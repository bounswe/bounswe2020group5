package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.model.Order
import com.example.bupazar.model.PreviousOrdersAdapter
import com.example.bupazar.model.VendorOrdersAdapter
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_previous_orders.*

class VendorOrdersFragment : Fragment() {

    private var authToken: String? = null
    private var orders: Array<Order>? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            authToken = arguments?.getSerializable("authToken") as String
            authToken = "Token " + authToken
        }
        val apiService = RestApiService()
        apiService.getVendorOrders(authToken!!){
            orders = it
            if (orders != null && orders!!.size > 0) {
                val vendorOrdersAdapter = this.context?.let { it1 -> orders?.let { it2 ->
                    VendorOrdersAdapter(it1, it2) }
                }
                previous_orders_rview.adapter = vendorOrdersAdapter
                previous_orders_rview.layoutManager = LinearLayoutManager(this.context)
                //vendorOrdersAdapter!!.onItemClick = { product ->
                    //requireActivity().supportFragmentManager.beginTransaction().apply {
                        //replace(R.id.fl_wrapper,  ProductFragment.newInstance(User.authToken, product.productId!!))
                        //commit()
                    //}
                //}
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_vendor_orders, container, false)
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            VendorOrdersFragment().apply {
                arguments = Bundle().apply {
                }
            }
    }
}