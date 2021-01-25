package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.bupazar.R
import kotlinx.android.synthetic.main.order_photo_item.view.*


class OrderPhotosAdapter(private val context: Context, private val orderPhotos: Array<String>) : RecyclerView.Adapter<OrderPhotosAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.order_photo_item, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val photoURL = orderPhotos[position]
        holder.bind(photoURL)
    }

    override fun getItemCount(): Int {
        return orderPhotos.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(photoURL: String) {
            Glide.with(context).load(photoURL).into(itemView.product_photo)
        }
    }
}