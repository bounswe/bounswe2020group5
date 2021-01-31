/*
* Created by Yasar Selcuk Caliskan
* An adapter class to show the previous orders given to the vendor in a recyclerview in the vendor orders page.
*/
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


class VendorOrdersAdapter(private val context: Context, private val orders: Array<Purchase>) : RecyclerView.Adapter<VendorOrdersAdapter.ViewHolder>() {

    var onItemClick: ((Purchase) -> Unit)? = null // on item click lambda

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.order_item, parent, false)
        return ViewHolder(view)
    }

    /*
    * Call the bind method for the item given in the position argument.
    */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val order = orders[position]
        holder.bind(order)
    }

    override fun getItemCount(): Int {
        return orders.size
    }

    /*
    * Bind products to recyclerview items.
    */
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        @SuppressLint("ResourceAsColor", "WrongConstant")
        fun bind(order: Purchase) {
            var totalPrice = 0f
            var orderStatus = 3
            val photoURLs = mutableListOf<String>() // For each order, product photos are shown in a horizontal recycler view. This list holds the imageURLs.
            var i = 0

            if (order != null) {
                photoURLs.add(order.product!!.imageUrl!!)
                var currentOrderStatus = 4
                totalPrice += order.amount!! * order.unit_price!!
                order.status = order.status!!.toLowerCase(Locale.ROOT)

                /*
                Set the currentOrderStatus variable so that status fields can be updated accordingly below.
                 */
                when {
                    order.status!! == "ordertaken" -> {
                        currentOrderStatus = 0
                    }
                    order.status!! == "preparing" -> {
                        currentOrderStatus = 1
                    }
                    order.status!! == "ship" -> {
                        currentOrderStatus = 2
                    }
                    order.status!! == "delivered" -> {
                        currentOrderStatus = 3
                    }
                }
                if (currentOrderStatus < orderStatus) {
                    orderStatus = currentOrderStatus
                }
            }
            itemView.order_id_text.text = "Order ID: #" + order.id.toString()
            itemView.order_price_text.text = "Price: " + "%.2f".format(totalPrice) + " $"

            /*
            Change the order status image and order status text accordingly.
             */
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

            val photoURLsArray: Array<String> = photoURLs.toTypedArray() // Change mutable list to an array since the recyclerview adapter needs an array as parameter.

            /*
            Set the the adapter for the horizontal recyclerview to show product images for each order.
            Therefore, this feature implements nested recyclerviews.
             */
            if (photoURLsArray.isNotEmpty()) {
                val orderPhotosAdapter = OrderPhotosAdapter(context, photoURLsArray)
                orderPhotosRview.adapter = orderPhotosAdapter
                orderPhotosRview.layoutManager = LinearLayoutManager(context, HORIZONTAL, false)
            }
        }

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(orders[adapterPosition])
            }
        }
    }
}