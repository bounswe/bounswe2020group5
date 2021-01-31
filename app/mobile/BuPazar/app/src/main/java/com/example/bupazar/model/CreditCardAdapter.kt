/*
* Created by Yasar Selcuk Caliskan
* An adapter class to show the credit cards in a recyclerview in the pay with another card page.
 */
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

    /*
    * Call the bind method for the item given in the position argument.
     */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val creditCard = creditCards[position]
        holder.bind(creditCard)
    }

    override fun getItemCount(): Int {
        return creditCards.size
    }

    /*
    * Bind products to recyclerview items.
     */
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(creditCard: CreditCard) {
            itemView.card_name_text.text = creditCard.name
            itemView.card_number_text.text = creditCard.cardNumber
            itemView.expiration_text.text = creditCard.expirationDate
            itemView.cvc_text.text = creditCard.cvc
        }

        /*
        * Set the on click listener to choose the credit card clicked by the user.
         */
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(creditCards[adapterPosition])
            }
        }
    }
}