package com.example.bupazar.page.fragment

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import com.example.bupazar.page.activity.login.LoginActivity
import com.example.bupazar.page.activity.login.RegisterActivity
import kotlinx.android.synthetic.main.fragment_guest_user_account.*
import kotlinx.android.synthetic.main.fragment_my_account.*


class GuestUserAccountFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_guest_user_account, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        loginButton.setOnClickListener(){
            var intent= Intent(this.activity, LoginActivity::class.java)
            startActivity(intent)
        }
        registerButton.setOnClickListener(){
            var intent= Intent(this.activity, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

}