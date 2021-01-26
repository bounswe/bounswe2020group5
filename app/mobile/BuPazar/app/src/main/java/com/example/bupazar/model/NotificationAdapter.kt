package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.bupazar.R
import kotlinx.android.synthetic.main.item_product.view.*

class NotificationAdapter(private val context: Context, val notifications: Array<NotificationResponse>) :
        RecyclerView.Adapter<NotificationAdapter.NotificationViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NotificationViewHolder {
        return NotificationViewHolder(
                LayoutInflater.from(parent.context)
                        .inflate(
                                R.layout.notification_row, parent, false
                        )
        )
    }

    override fun onBindViewHolder(libraryViewHolder: NotificationViewHolder, position: Int) =
            libraryViewHolder.bindItem(notifications[position].notificationText,notifications[position].product.imageUrl,notifications[position].product.name, notifications[position].product.description)

    override fun getItemCount(): Int = notifications.size

    inner class NotificationViewHolder constructor(view: View) : RecyclerView.ViewHolder(view) {
        private val notificationText : TextView = view.findViewById(R.id.notificationText)
        private val productImage : ImageView = view.findViewById(R.id.product_image)
        private val productName : TextView = view.findViewById(R.id.product_name)
        private val productDescription : TextView = view.findViewById(R.id.product_description)

        fun bindItem(notifText: String, image: String, name: String, description: String){
            notificationText.text = notifText
            productName.text = name
            productDescription.text = description
            Glide.with(context).load(image).into(productImage)
        }
    }
}