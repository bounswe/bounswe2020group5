/*
* Created by Yasar Selcuk Caliskan
* Fragment class to show to the user when her/his order is successful.
 */
package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import com.example.bupazar.model.LoginResponse
import kotlinx.android.synthetic.main.fragment_successful_order.*
import kotlinx.android.synthetic.main.homepage_activity.*

class SuccessfulOrderFragment : Fragment() {

    private var userData: LoginResponse? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userData = arguments?.getSerializable("USERDATA") as LoginResponse
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_successful_order, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        /*
        * Go to home page button on click listener implementation.
        * When clicked, user will be redirected to the home page.
         */
        go_to_home_page_button.setOnClickListener {
            val homePage = HomepageFragment()
            val bundle = Bundle()
            bundle.putSerializable("USERDATA", userData)
            homePage.arguments = bundle
            requireActivity().bottom_navigation.visibility = View.VISIBLE
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper, homePage)
                commit()
            }
        }
    }

    companion object {
        @JvmStatic
        fun newInstance() =
                SuccessfulOrderFragment().apply {
                    arguments = Bundle().apply {
                    }
                }
    }
}