package com.example.bupazar.page.fragment.register

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.CreditCardAdapter
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.model.Order
import com.example.bupazar.page.fragment.OrderFragment
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_pay_with_another_card.*

class PreviousOrdersFragment : Fragment() {

    private var userData: LoginResponse? = null
    private var authToken: String? = null
    private var orders: Array<Order>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userData = arguments?.getSerializable("USERDATA") as LoginResponse
            authToken = "Token " + userData!!.authToken
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_previous_orders, container, false)
    }

    companion object {

        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            PreviousOrdersFragment().apply {
                arguments = Bundle().apply {
                }
            }
    }
}