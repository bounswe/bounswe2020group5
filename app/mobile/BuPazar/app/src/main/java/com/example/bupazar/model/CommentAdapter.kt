package com.example.bupazar.model

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.bupazar.R

class CommentAdapter(val comments: Array<CommentDetails>) :
        RecyclerView.Adapter<CommentAdapter.CommentViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder {
        return CommentViewHolder(
                LayoutInflater.from(parent.context)
                        .inflate(
                                R.layout.row_comment, parent, false
                        )
        )
    }

    override fun onBindViewHolder(libraryViewHolder: CommentViewHolder, position: Int) =
            libraryViewHolder.bindItem(comments[position].customerName,comments[position].comment,comments[position].rate)

    override fun getItemCount(): Int = comments.size

    inner class CommentViewHolder constructor(view: View) : RecyclerView.ViewHolder(view) {
        private val userText : TextView = view.findViewById(R.id.userText)
        private val commentText : TextView = view.findViewById(R.id.commentText)
        private val rateText : TextView = view.findViewById(R.id.rateText)

        fun bindItem(name: String, comment: String, rate : Int){
            userText.text = "User: " + name
            commentText.text = comment
            rateText.text = "Rate: " + rate.toString()
        }
    }
}