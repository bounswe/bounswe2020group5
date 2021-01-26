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
import com.example.bupazar.model.Purchase
import kotlinx.android.synthetic.main.fragment_vendor_order_detail.*
import kotlinx.android.synthetic.main.order_item.view.*
import kotlinx.android.synthetic.main.order_photo_item.view.*

class VendorOrderDetailFragment : Fragment() {

    private var order: Purchase? = null
    private var orderStatus: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            order = arguments?.getSerializable("order") as Purchase
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

        if (order != null) {
            order_id_text.text = "Order ID: #" + order!!.id.toString()
            order_price_text.text = "Price: " + "%.2f".format(order!!.amount!! * order!!.unit_price!!) + " $"
            Glide.with(requireContext()).load(order!!.product!!.imageUrl).into(product_image)

            when (order!!.status) {
                "ordertaken" -> {
                    order_status_image.setImageResource(R.drawable.ic_shopping_bag)
                    order_status_text.text = "Order is taken."
                    order_status_text.setTextColor(R.color.black)
                    order_taken_button.setBackgroundResource(R.color.secondary_blue)
                    order_taken_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 1
                }
                "preparing" -> {
                    order_status_image.setImageResource(R.drawable.ic_baseline_hourglass_top_24)
                    order_status_text.text = "Order is being prepared."
                    order_status_text.setTextColor(R.color.black)
                    order_preparing_button.setBackgroundResource(R.color.secondary_blue)
                    order_preparing_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 2
                }
                "ship" -> {
                    order_status_image.setImageResource(R.drawable.ic_baseline_electric_rickshaw_24)
                    order_status_text.text = "Your order is being shipped."
                    order_status_text.setTextColor(R.color.black)
                    order_shipping_button.setBackgroundResource(R.color.secondary_blue)
                    order_shipping_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 3
                }
                "delivered" -> {
                    order_status_text.text = "Order delivered."
                    order_delivered_button.setBackgroundResource(R.color.secondary_blue)
                    order_delivered_button_text.setTextColor(ContextCompat.getColor(requireContext(),R.color.colorTextWhite))
                    orderStatus = 4
                }
            }
        }

        order_taken_button.setOnClickListener {

        }

        order_preparing_button.setOnClickListener {

        }

        order_shipping_button.setOnClickListener {

        }

        order_delivered_button.setOnClickListener {

        }
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