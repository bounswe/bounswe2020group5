package com.example.bupazar.model

import android.content.Context
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.bupazar.R
import com.example.bupazar.User
import kotlinx.android.synthetic.main.item_chat.view.*

class ChatAdapter(private val context: Context, private val chats: Array<Chat>) : RecyclerView.Adapter<ChatAdapter.ViewHolder>() {

    var onItemClick: ((Chat) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_chat, parent, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val chat = chats[position]
        holder.bind(chat, position)
    }

    override fun getItemCount(): Int {
        return chats.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(chat: Chat, position: Int) {
            if (User.isVendor)
                itemView.txtChatUsername.text = chat.customerUsername
            else
                itemView.txtChatUsername.text = chat.vendorUsername
            if (position % 2 == 1) {
                itemView.txtChatUsername.setBackgroundResource(R.drawable.my_chat_bubble2)
            }
        }

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(chats[adapterPosition])
            }
        }
    }
}