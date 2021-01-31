/*
* Created by Sertay Akpinar
* An adapter class to show the products added to the wish list in a recyclerview in the favorites page.
 */
package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.bupazar.R
import kotlinx.android.synthetic.main.favorite_list_product_item.view.*
import kotlinx.android.synthetic.main.item_product.view.product_image
import kotlinx.android.synthetic.main.item_product.view.product_name


class FavoriteListProductAdapter(private val context: Context, private val favoriteListProducts: Array<FavoriteListProduct>) : RecyclerView.Adapter<FavoriteListProductAdapter.ViewHolder>() {

    var onItemClick: ((FavoriteListProduct) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.favorite_list_product_item, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val favoriteListProduct = favoriteListProducts[position]
        if (position != favoriteListProducts.size - 1) {
            holder.bind(favoriteListProduct)
        }
        else {
            holder.bindLastItem(favoriteListProduct)
        }
    }

    override fun getItemCount(): Int {
        return favoriteListProducts.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(favoriteListProduct: FavoriteListProduct) {
            itemView.vendor_name_text.text = "Vendor: " + favoriteListProduct.vendor
            itemView.product_name.text = favoriteListProduct.name
            itemView.product_description.text = favoriteListProduct.description
            itemView.product_brand.text = "Brand: " + favoriteListProduct.brand
            itemView.price.text = "Price: $" + favoriteListProduct.price
            Glide.with(context).load(favoriteListProduct.imageUrl).into(itemView.product_image)
        }
        fun bindLastItem(favoriteListProduct: FavoriteListProduct) {
            itemView.vendor_name_text.text = "Vendor: " + favoriteListProduct.vendor
            itemView.product_name.text = favoriteListProduct.name
            itemView.product_description.text = favoriteListProduct.description
            itemView.product_brand.text = "Brand: " + favoriteListProduct.brand
            itemView.price.text = "Price: $" + favoriteListProduct.price
            Glide.with(context).load(favoriteListProduct.imageUrl).into(itemView.product_image)
            itemView.divider.visibility = View.INVISIBLE
            itemView.divider.background = null
        }
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(favoriteListProducts[adapterPosition])
            }
        }
    }
}