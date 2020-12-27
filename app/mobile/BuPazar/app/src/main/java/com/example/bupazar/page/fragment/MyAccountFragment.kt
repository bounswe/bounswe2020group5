package com.example.bupazar.page.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.bupazar.R
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.page.activity.login.LoginActivity
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
            val intent=Intent(this.activity, LoginActivity::class.java)
            startActivity(intent)
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