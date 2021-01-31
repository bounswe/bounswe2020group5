/*
* Created by Yasar Selcuk Caliskan
* Fragment class to handle user orders page.
 */

package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.example.bupazar.R
import com.example.bupazar.model.CreditCard
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_order.*
import kotlinx.android.synthetic.main.homepage_activity.*


class OrderFragment : Fragment() {

    private var userData: LoginResponse? = null
    private var authToken: String? = null
    private var creditCards: Array<CreditCard>? = null
    private var chosenCreditCard: CreditCard? = null
    private var price: Float? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userData = arguments?.getSerializable("USERDATA") as LoginResponse
            authToken = "Token " + userData!!.authToken
            price = arguments?.getSerializable("price") as Float
            chosenCreditCard = arguments?.getSerializable("chosenCreditCard") as CreditCard?
        }
        requireActivity().bottom_navigation.visibility = View.INVISIBLE
        val apiService = RestApiService()

        /*
        * Fetch the credit cards, and show the first card on the page
         */
        apiService.getCreditCards(authToken!!) {
            creditCards = it
            if (chosenCreditCard != null) {
                card_name_text.text = chosenCreditCard!!.name
            }
            else if (creditCards == null || creditCards!!.size == 0) {
                card_name_text.text = "Please add credit card!"
            }
            else {
                card_name_text.text = creditCards?.get(0)?.name
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_order, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val apiService = RestApiService()

        /*
        * Fetch the credit cards, and show the first card on the page
        */
        apiService.getCreditCards(authToken!!) {
            creditCards = it
            if (chosenCreditCard != null) {
                card_name_text.text = chosenCreditCard!!.name
            }
            else if (creditCards == null || creditCards!!.size == 0) {
                card_name_text.text = "Please add credit card!"
            }
            else {
                card_name_text.text = creditCards?.get(0)?.name
            }
        }
        address_text.setText(userData!!.address)
        installment_price.text = "$" + price
        total_price_text.text = "$" + price

       /*
       * Place order button set on click listener implementation.
       * Checks if the gdpr is agreed, then redirects user to successful order page if success is returned by the API.
        */
       place_order_button.setOnClickListener {
            if (gdpr_checkbox.isChecked && !card_name_text.text.equals("Please add credit card!") && one_installment_checkbox.isChecked) {
                apiService.makePurchase(authToken!!) {
                    if (it?.success == "Products in cart are successfully purchased") {
                        val successfulOrderFragment = SuccessfulOrderFragment()
                        val bundle = Bundle()
                        bundle.putSerializable("USERDATA", userData)
                        successfulOrderFragment.arguments = bundle
                        requireActivity().bottom_navigation.visibility = View.VISIBLE
                        requireActivity().supportFragmentManager.beginTransaction().apply {
                            replace(R.id.fl_wrapper, successfulOrderFragment)
                            commit()
                        }
                    }
                }
            }
            else if (card_name_text.text.equals("Please add credit card!")) {
                Toast.makeText(this.activity,"Please add credit card!", Toast.LENGTH_SHORT).show()
            }
            else {
                Toast.makeText(this.activity, "Please agree to the terms of GDPR.", Toast.LENGTH_LONG).show()
            }
        }

        /*
        * Pay with another card on click listener implementation.
        * Redirects the user to the payWithAnotherCardFragment, where the user can choose one of the existing cards or add a new one.
         */
        pay_with_another_card.setOnClickListener {
            val payWithAnotherCardFragment = PayWithAnotherCardFragment()
            val bundle = Bundle()
            bundle.putSerializable("USERDATA", userData)
            bundle.putSerializable("price", price)
            payWithAnotherCardFragment.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper, payWithAnotherCardFragment)
                commit()
            }
        }
    }

    companion object {
        @JvmStatic
        fun newInstance() =
            OrderFragment().apply {
                arguments = Bundle().apply {
                }
            }
    }
}