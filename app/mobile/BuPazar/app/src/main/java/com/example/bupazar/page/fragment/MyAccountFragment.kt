package com.example.bupazar.page.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.bupazar.R
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.page.activity.login.LoginActivity
import com.example.bupazar.page.activity.message.MessageMainActivity
import com.example.bupazar.page.fragment.register.PreviousOrdersFragment
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_my_account.*


class MyAccountFragment : Fragment() {
    var userData : LoginResponse? = null
    lateinit var userNameTextView: TextView
    lateinit var mailTextView: TextView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        userData = arguments?.getSerializable("USERDATA") as LoginResponse
        return inflater.inflate(R.layout.fragment_my_account, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        userNameTextView = view.findViewById(R.id.accountPageUserNameTextView)
        userNameTextView.text = "${userData?.firstName} ${userData?.lastName}"
        mailTextView = view.findViewById(R.id.accountPageUserEmail)
        mailTextView.text = "${userData?.userEmail}"

        logoutLayout.setOnClickListener {
            val restApiService = RestApiService()
            restApiService.userLogout {
                if (it?.success != null) {
                    Toast.makeText(this.activity, "Successfully logged out", Toast.LENGTH_SHORT).show()
                    val intent=Intent(this.activity, LoginActivity::class.java)
                    startActivity(intent)
                }else {
                    Toast.makeText(this.activity, "Failed to logout", Toast.LENGTH_SHORT).show()
                    println("Failed to logout")
                }
            }
        }

        messagesLayout.setOnClickListener() {
            var intent=Intent(this.activity, MessageMainActivity::class.java)
            startActivity(intent)
        }

        ordersLayout.setOnClickListener() {
            val previousOrdersFragment = PreviousOrdersFragment()
            val bundle = Bundle()
            bundle.putSerializable("USERDATA",userData)
            previousOrdersFragment.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  previousOrdersFragment)
                commit()
            }
        }

        personalInfoLayout.setOnClickListener {
            val profilePage = ProfilePageFragment()
            val bundle = Bundle()
            bundle.putSerializable("USERDATA",userData)
            profilePage.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  profilePage)
                commit()
            }
        }
    }
}