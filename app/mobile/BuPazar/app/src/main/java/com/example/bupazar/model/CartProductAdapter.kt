/*
* Created by Yasar Selcuk Caliskan
* An adapter class to show the products added to the cart in a recyclerview in the cart page.
*/
package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.bupazar.R
import kotlinx.android.synthetic.main.cart_product_item.view.*
import kotlinx.android.synthetic.main.item_product.view.product_image
import kotlinx.android.synthetic.main.item_product.view.product_name
import kotlinx.android.synthetic.main.item_product.view.product_price


class CartProductAdapter(private val context: Context, private val cartProducts: Array<CartProduct>) : RecyclerView.Adapter<CartProductAdapter.ViewHolder>() {

    var onItemClick: ((CartProduct) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.cart_product_item, parent, false)
        return ViewHolder(view)
    }

    /*
    * Call the bind method for the item given in the position argument.
    */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val cartProduct = cartProducts[position]
        if (position != cartProducts.size - 1) {
            holder.bind(cartProduct)
        }
        else {
            holder.bindLastItem(cartProduct)
        }
    }

    override fun getItemCount(): Int {
        return cartProducts.size
    }

    /*
    * Bind products to recyclerview items.
    */
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(cartProduct: CartProduct) {
            itemView.vendor_name_text.text = "Vendor: " + cartProduct.product.vendor
            itemView.product_name.text = cartProduct.product.name
            itemView.product_description.text = cartProduct.product.description
            itemView.product_brand.text = "Brand: " + cartProduct.product.brand
            itemView.product_quantity.text = "Quantity: " + cartProduct.count
            itemView.product_price.text = "$" + (cartProduct.product.price?.times(cartProduct.count))
            Glide.with(context).load(cartProduct.product.imageUrl).into(itemView.product_image) /* Fetch the image using Glide library. */
        }
        /*
        * Another implementation to only bind the last item is needed, since the divider item will not be shown in the last item.
         */
        fun bindLastItem(cartProduct: CartProduct) {
            itemView.vendor_name_text.text = "Vendor: " + cartProduct.product.vendor
            itemView.product_name.text = cartProduct.product.name
            itemView.product_description.text = cartProduct.product.description
            itemView.product_brand.text = "Brand: " + cartProduct.product.brand
            itemView.product_quantity.text = "Quantity: " + cartProduct.count
            itemView.product_price.text = "$" + (cartProduct.product.price?.times(cartProduct.count))
            Glide.with(context).load(cartProduct.product.imageUrl).into(itemView.product_image)
            itemView.divider.visibility = View.INVISIBLE
            itemView.divider.background = null
        }

        /*
        * Set the on click listener to enable going to product page for the item chosen from the cart page.
         */
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(cartProducts[adapterPosition])
            }
        }
    }
}