package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.bupazar.R
import kotlinx.android.synthetic.main.item_product.view.*


class ProductAdapter(private val context: Context, private val products: Array<ProductDetails>) : RecyclerView.Adapter<ProductAdapter.ViewHolder>() {

    var onItemClick: ((ProductDetails) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_product, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = products[position]
        holder.bind(product)
    }

    override fun getItemCount(): Int {
        return products.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(product: ProductDetails) {
            itemView.product_name.text = product.name
            itemView.product_price.text = "$" + "%.2f".format(product.price)
            Glide.with(context).load(product.imageUrl).into(itemView.product_image)
        }

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(products[adapterPosition])
            }
        }
    }
}