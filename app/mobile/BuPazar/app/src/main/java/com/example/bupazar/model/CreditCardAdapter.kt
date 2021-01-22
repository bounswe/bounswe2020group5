package com.example.bupazar.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.bupazar.R
import kotlinx.android.synthetic.main.credit_card_item.view.*


class CreditCardAdapter(private val context: Context, private val creditCards: Array<CreditCard>) : RecyclerView.Adapter<CreditCardAdapter.ViewHolder>() {

    var onItemClick: ((CreditCard) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.credit_card_item, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val creditCard = creditCards[position]
        holder.bind(creditCard)
    }

    override fun getItemCount(): Int {
        return creditCards.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(creditCard: CreditCard) {
            itemView.order_id_text.text = creditCard.name
            itemView.card_number_text.text = creditCard.cardNumber
            itemView.expiration_text.text = creditCard.expirationDate
            itemView.cvc_text.text = creditCard.cvc
        }

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(creditCards[adapterPosition])
            }
        }
    }
}