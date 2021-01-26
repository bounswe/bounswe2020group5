package com.example.bupazar.page.fragment

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.*
import com.example.bupazar.page.activity.login.VendorHomepageActivity
import com.example.bupazar.page.activity.message.MessageMainActivity
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.activity_vendor_homepage.*
import kotlinx.android.synthetic.main.fragment_previous_orders.*
import kotlinx.android.synthetic.main.fragment_vendor_order_detail.*

class VendorOrdersFragment : Fragment() {

    private var authToken: String? = null // Vendor auth token
    private var orders: Array<Purchase>? = null // Hold the purchases

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            authToken = arguments?.getSerializable("authToken") as String
            authToken = "Token " + authToken // API requires tokens to be in the format Token <authToken>
        }

        // Fetch the orders made to the vendor
        val apiService = RestApiService()
        apiService.getVendorOrders(authToken!!){
            orders = it
            if (orders != null && orders!!.size > 0) {
                val vendorOrdersAdapter = this.context?.let { it1 -> orders?.let { it2 ->
                    VendorOrdersAdapter(it1, it2) }
                }
                // Fill the orders recyclerview
                previous_orders_rview.adapter = vendorOrdersAdapter
                previous_orders_rview.layoutManager = LinearLayoutManager(this.context)

                // Implement on click functionality for the order, go to order detail page for the corresponding
                vendorOrdersAdapter!!.onItemClick = { order ->
                    val vendorOrderDetailFragment = VendorOrderDetailFragment()
                    val bundle = Bundle()
                    bundle.putSerializable("order", order)
                    bundle.putSerializable("authToken", authToken)
                    vendorOrderDetailFragment.arguments = bundle
                    requireActivity().supportFragmentManager.beginTransaction().apply {
                        replace(R.id.activity_vendor_1,  vendorOrderDetailFragment)
                        commit()
                    }
                }
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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // If the top left back button is pressed, go back to the main vendor homepage activity
        back_button.setOnClickListener {
            //requireActivity().activity_vendor_2.visibility = View.VISIBLE
            var intent= Intent(requireContext(), VendorHomepageActivity::class.java)
            startActivity(intent)
        }
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