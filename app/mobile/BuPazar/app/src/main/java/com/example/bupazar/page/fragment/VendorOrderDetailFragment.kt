/*
* Created by Yasar Selcuk Caliskan
* Fragment class to handle vendor order details page, the page where the vendors go by clicking on an order in the vendor orders page.
 */
package com.example.bupazar.page.fragment

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import com.bumptech.glide.Glide
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.Purchase
import com.example.bupazar.model.UpdateStatusRequest
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.activity_vendor_homepage.*
import kotlinx.android.synthetic.main.fragment_vendor_order_detail.*
import kotlinx.android.synthetic.main.order_item.view.*
import kotlinx.android.synthetic.main.order_photo_item.view.*

class VendorOrderDetailFragment : Fragment() {

    private var order: Purchase? = null // Hold the order details
    private var orderStatus: Int = 0 // A variable to store the order status in order to prevent going back (e.g changing delivered status to order taken)
    private var authToken: String? = null // Auth token of the logged in user


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            order = arguments?.getSerializable("order") as Purchase
            authToken = arguments?.getSerializable("authToken") as String // It will be given Token <authToken>, no need to add Token again
        }

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_vendor_order_detail, container, false)
    }

    @SuppressLint("ResourceAsColor")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val apiService = RestApiService()

        // Set the fields in the xml to populate the view
        if (order != null) {
            order_id_text.text = "Order ID: #" + order!!.id.toString()
            order_price_text.text = "Price: " + "%.2f".format(order!!.amount!! * order!!.unit_price!!) + " $"
            order_productname_text.text = "Product: " + order!!.product!!.name
            order_customerid_text.text = "Customer ID: #" + order!!.customer.toString()
            Glide.with(requireContext()).load(order!!.product!!.imageUrl).into(product_image)

            /*
            Given the order status, highlight the according button and change the status shown above the product image.
             */
            when (order!!.status) {
                "ordertaken" -> {
                    order_status_image.setImageResource(R.drawable.ic_shopping_bag)
                    order_status_text.text = "Order is taken."
                    order_status_text.setTextColor(R.color.black)
                    order_taken_button.setBackgroundResource(R.color.secondary_blue)
                    order_taken_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 0
                }
                "preparing" -> {
                    order_status_image.setImageResource(R.drawable.ic_baseline_hourglass_top_24)
                    order_status_text.text = "Order is being prepared."
                    order_status_text.setTextColor(R.color.black)
                    order_preparing_button.setBackgroundResource(R.color.secondary_blue)
                    order_preparing_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 1
                }
                "ship" -> {
                    order_status_image.setImageResource(R.drawable.ic_baseline_electric_rickshaw_24)
                    order_status_text.text = "Your order is being shipped."
                    order_status_text.setTextColor(R.color.black)
                    order_shipping_button.setBackgroundResource(R.color.secondary_blue)
                    order_shipping_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 2
                }
                "delivered" -> {
                    order_status_text.text = "Order delivered."
                    order_delivered_button.setBackgroundResource(R.color.secondary_blue)
                    order_delivered_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 3
                }
            }
        }

        /*
        On click listener functionality for the update status buttons. For all of them highlight the button, change the status shown above,
        and make an API request to update the status at backend.
         */
        order_taken_button.setOnClickListener {
            makeAllButtonsDefault()
            order_status_image.setImageResource(R.drawable.ic_shopping_bag)
            order_status_text.text = "Order is taken."
            order_status_text.setTextColor(R.color.black)
            order_taken_button.setBackgroundResource(R.color.secondary_blue)
            order_taken_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
            orderStatus = 0

            // Make the API request to change status
            var updateStatusRequest = UpdateStatusRequest(order!!.id, "Order Taken")
            apiService.updateOrderStatus(authToken!!, updateStatusRequest) {
            }
        }

        order_preparing_button.setOnClickListener {
            makeAllButtonsDefault()
            order_status_image.setImageResource(R.drawable.ic_baseline_hourglass_top_24)
            order_status_text.text = "Order is being prepared."
            order_status_text.setTextColor(R.color.black)
            order_preparing_button.setBackgroundResource(R.color.secondary_blue)
            order_preparing_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
            orderStatus = 1

            // Make the API request to change status
            var updateStatusRequest = UpdateStatusRequest(order!!.id, "Preparing")
            apiService.updateOrderStatus(authToken!!, updateStatusRequest) {
            }
        }

        order_shipping_button.setOnClickListener {
            makeAllButtonsDefault()
            order_status_image.setImageResource(R.drawable.ic_baseline_electric_rickshaw_24)
            order_status_text.text = "Your order is being shipped."
            order_status_text.setTextColor(R.color.black)
            order_shipping_button.setBackgroundResource(R.color.secondary_blue)
            order_shipping_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
            orderStatus = 2

            // Make the API request to change status
            var updateStatusRequest = UpdateStatusRequest(order!!.id, "Ship")
            apiService.updateOrderStatus(authToken!!, updateStatusRequest) {
            }
        }

        order_delivered_button.setOnClickListener {
            makeAllButtonsDefault()
            order_status_image.setImageResource(R.drawable.ic_baseline_check_24)
            order_status_text.text = "Order delivered."
            order_status_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.order_delivered_green))
            order_delivered_button.setBackgroundResource(R.color.secondary_blue)
            order_delivered_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
            orderStatus = 3

            // Make the API request to change status
            var updateStatusRequest = UpdateStatusRequest(order!!.id, "Delivered")
            apiService.updateOrderStatus(authToken!!, updateStatusRequest) {
            }
        }

        // If the top left back button is pressed, go back to vendor orders page
        back_button.setOnClickListener {
            val vendorOrdersPage = VendorOrdersFragment()
            val bundle = Bundle()
            bundle.putSerializable("authToken", User.authToken)
            vendorOrdersPage.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.activity_vendor_1,  vendorOrdersPage)
                commit()
            }
        }
    }

    // Before highlighting to another button, make all of them white with border with text color secondary blue
    fun makeAllButtonsDefault() {
        order_taken_button.setBackgroundResource(R.drawable.rectangle_border)
        order_taken_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.secondary_blue))
        order_preparing_button.setBackgroundResource(R.drawable.rectangle_border)
        order_preparing_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.secondary_blue))
        order_shipping_button.setBackgroundResource(R.drawable.rectangle_border)
        order_shipping_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.secondary_blue))
        order_delivered_button.setBackgroundResource(R.drawable.rectangle_border)
        order_delivered_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.secondary_blue))
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            VendorOrderDetailFragment().apply {
                arguments = Bundle().apply {
                }
            }
    }
}