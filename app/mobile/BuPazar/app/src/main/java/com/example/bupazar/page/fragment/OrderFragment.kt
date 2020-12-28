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
import kotlinx.android.synthetic.main.fragment_categories.*
import kotlinx.android.synthetic.main.fragment_order.*
import kotlinx.android.synthetic.main.homepage_activity.*


class OrderFragment : Fragment() {

    private var userData: LoginResponse? = null
    private var authToken: String? = null
    private var creditCards: Array<CreditCard>? = null
    private var price: Float? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userData = arguments?.getSerializable("USERDATA") as LoginResponse
            authToken = "Token " + userData!!.authToken
            price = arguments?.getSerializable("price") as Float
        }
        requireActivity().bottom_navigation.visibility = View.INVISIBLE
        val apiService = RestApiService()

        apiService.getCreditCards(authToken!!) {
            creditCards = it
            card_name_text.text = creditCards?.get(0)?.name ?: "Please add card"
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

        apiService.getCreditCards(authToken!!) {
            creditCards = it
            card_name_text.text = creditCards?.get(0)?.name ?: "Please add card"
        }
        address_text.text = userData!!.address
        installment_price.text = "$" + price
        total_price_text.text = "$" + price

       place_order_button.setOnClickListener {
            if (gdpr_checkbox.isChecked) {
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
            else {
                Toast.makeText(this.context, "Please agree to the terms of GDPR.", Toast.LENGTH_LONG).show()
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