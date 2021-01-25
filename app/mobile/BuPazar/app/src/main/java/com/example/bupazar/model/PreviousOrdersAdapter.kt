package com.example.bupazar.model

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout.HORIZONTAL
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.bupazar.R
import kotlinx.android.synthetic.main.order_item.view.*
import java.util.*


class PreviousOrdersAdapter(private val context: Context, private val previousOrders: Array<Order>) : RecyclerView.Adapter<PreviousOrdersAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.order_item, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val order = previousOrders[position]
        holder.bind(order)
    }

    override fun getItemCount(): Int {
        return previousOrders.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        @SuppressLint("ResourceAsColor", "WrongConstant")
        fun bind(order: Order) {
            var totalPrice = 0f
            var orderStatus = 3
            val photoURLs = mutableListOf<String>()
            var i = 0

            if (order.purchases != null) {
                for (purchase in order.purchases) {
                    photoURLs.add(purchase.product!!.imageUrl!!)
                    i += 1
                    var currentOrderStatus = 4
                    totalPrice += purchase.amount!! * purchase.unit_price!!
                    purchase.status = purchase.status!!.toLowerCase(Locale.ROOT)
                    when {
                        purchase.status!! == "ordertaken" -> {
                            currentOrderStatus = 0
                        }
                        purchase.status!! == "preparing" -> {
                            currentOrderStatus = 1
                        }
                        purchase.status!! == "ship" -> {
                            currentOrderStatus = 2
                        }
                        purchase.status!! == "delivered" -> {
                            currentOrderStatus = 3
                        }
                    }
                    if (currentOrderStatus < orderStatus) {
                        orderStatus = currentOrderStatus
                    }
                }
            }
            itemView.order_id_text.text = "Order ID: #" + order.order_id.toString()
            itemView.order_price_text.text = "Price: " + "%.2f".format(totalPrice) + " $"

            when (orderStatus) {
                0 -> {
                    itemView.order_status_image.setImageResource(R.drawable.ic_shopping_bag)
                    itemView.order_status_text.text = "Order is taken."
                    itemView.order_status_text.setTextColor(R.color.black)
                }
                1 -> {
                    itemView.order_status_image.setImageResource(R.drawable.ic_baseline_hourglass_top_24)
                    itemView.order_status_text.text = "Order is being prepared."
                    itemView.order_status_text.setTextColor(R.color.black)
                }
                2 -> {
                    itemView.order_status_image.setImageResource(R.drawable.ic_baseline_electric_rickshaw_24)
                    itemView.order_status_text.text = "Your order is being shipped."
                    itemView.order_status_text.setTextColor(R.color.black)
                }
                3 -> {
                    itemView.order_status_text.text = "Order delivered."
                }
            }

            val orderPhotosRview = itemView.order_item_photos_rview

            val photoURLsArray: Array<String> = photoURLs.toTypedArray()

            if (photoURLsArray.isNotEmpty()) {
                val orderPhotosAdapter = OrderPhotosAdapter(context, photoURLsArray)
                orderPhotosRview.adapter = orderPhotosAdapter
                orderPhotosRview.layoutManager = LinearLayoutManager(context, HORIZONTAL, false)
            }
        }
    }
}