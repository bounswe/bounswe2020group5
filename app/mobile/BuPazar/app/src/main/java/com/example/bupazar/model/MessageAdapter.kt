package com.example.bupazar.model


import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.bupazar.R
import com.example.bupazar.User
import kotlinx.android.synthetic.main.my_message.view.*
import kotlinx.android.synthetic.main.other_message.view.*


private const val VIEW_TYPE_MY_MESSAGE = 1
private const val VIEW_TYPE_OTHER_MESSAGE = 2

class MessageAdapter (val context: Context) : RecyclerView.Adapter<MessageViewHolder>() {
    private val messages: ArrayList<Message> = ArrayList()

    fun addMessage(message: Message){
        messages.add(message)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return messages.size
    }

    override fun getItemViewType(position: Int): Int {
        val message = messages.get(position)

        return if(message.whoseMessage == "customer") {
            VIEW_TYPE_MY_MESSAGE
        }
        else {
            VIEW_TYPE_OTHER_MESSAGE
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageViewHolder {
        return if(viewType == VIEW_TYPE_MY_MESSAGE) {
            MyMessageViewHolder(LayoutInflater.from(context).inflate(R.layout.my_message, parent, false))
        } else {
            OtherMessageViewHolder(LayoutInflater.from(context).inflate(R.layout.other_message, parent, false))
        }
    }

    override fun onBindViewHolder(holder: MessageViewHolder, position: Int) {
        val message = messages.get(position)

        holder.bind(message)
    }

    inner class MyMessageViewHolder (view: View) : MessageViewHolder(view) {
        private var messageText: TextView = view.txtMyMessage
        private var timeText: TextView = view.txtMyMessageTime

        override fun bind(message: Message) {
            messageText.text = message.content
            timeText.text = message.dateSent?.takeLast(9)?.take(5)
        }
    }

    inner class OtherMessageViewHolder (view: View) : MessageViewHolder(view) {
        private var otherUsernameText: TextView = view.txtOtherUser
        private var messageText: TextView = view.txtOtherMessage
        private var timeText: TextView = view.txtOtherMessageTime

        override fun bind(message: Message) {
            messageText.text = message.content
            timeText.text = message.dateSent?.takeLast(9)?.take(5)
            otherUsernameText.text = "Vendor"

        }
    }
}

open class MessageViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    open fun bind(message:Message) {}
}