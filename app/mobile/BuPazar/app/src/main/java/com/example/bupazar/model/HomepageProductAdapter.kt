/*
* Created by Yasar Selcuk Caliskan
* An adapter class to show the products in the homepage, and other product pages -recommended, trending, new arrivals, and best sellers.
 */
package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Filter
import android.widget.Filterable
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.bupazar.R
import kotlinx.android.synthetic.main.item_product.view.*


class HomepageProductAdapter(private val context: Context, private val products: Array<ProductDetails>) : RecyclerView.Adapter<HomepageProductAdapter.ViewHolder>(), Filterable {

    var onItemClick: ((ProductDetails) -> Unit)? = null

    var productFilterList = ArrayList<ProductDetails>()

    init {
        for (product in products) {
            productFilterList.add(product)
        }
    }

    /*
    * Used the tutorial code at: https://johncodeos.com/how-to-add-search-in-recyclerview-using-kotlin/
    * Filter the product based on the given charSearch query.
    * Supports real time search, such that when a change is made in the search bar, items are updated instantly & automatically.
    */
    override fun getFilter(): Filter {
        return object : Filter() {
            override fun performFiltering(constraint: CharSequence?): FilterResults {
                val charSearch = constraint.toString()
                if (charSearch.isEmpty() || charSearch == "") {
                    productFilterList.clear()
                    for (product in products) {
                        productFilterList.add(product)
                    }
                    val filterResults = FilterResults()
                    filterResults.values = productFilterList
                    return filterResults
                } else {
                    val resultList = ArrayList<ProductDetails>()
                    for (product in products) {
                        if (product.brand!!.toLowerCase().contains(charSearch.toLowerCase()) || product.name!!.toLowerCase().contains(charSearch.toLowerCase())
                            || product.category!!.toLowerCase().contains(charSearch.toLowerCase()) || product.vendor!!.toLowerCase().contains(charSearch.toLowerCase())) {
                            resultList.add(product)
                        }
                    }
                    productFilterList = resultList
                }
                val filterResults = FilterResults()
                filterResults.values = productFilterList
                return filterResults
            }

            @Suppress("UNCHECKED_CAST")
            override fun publishResults(constraint: CharSequence?, results: FilterResults?) {
                productFilterList = results?.values as ArrayList<ProductDetails>
                notifyDataSetChanged()
            }

        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_product, parent, false)
        return ViewHolder(view)
    }

    /*
    * Call the bind method for the item given in the position argument.
     */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = productFilterList[position]
        holder.bind(product)
    }

    override fun getItemCount(): Int {
        return productFilterList.size
    }

    /*
    * Bind products to recyclerview items.
     */
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(product: ProductDetails) {
            itemView.product_name.text = product.name
            itemView.product_price.text = "$" + "%.2f".format(product.price)
            Glide.with(context).load(product.imageUrl).into(itemView.product_image) /* Fetch the image using Glide library. */
        }

        /*
        * Set the on click listener to enable going to product page for the item chosen from the cart page.
        */
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(productFilterList[adapterPosition])
            }
        }
    }
}