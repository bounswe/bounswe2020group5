package com.example.bupazar.page.activity.login

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.bupazar.R
import com.example.bupazar.`interface`.ActivityChangeListener
import com.example.bupazar.core.BaseActivity
import com.example.bupazar.page.activity.home.HomepageActivity
import com.example.bupazar.page.fragment.login.view.LoginFragment
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.fragment_login.*

class LoginActivity : BaseActivity(), ActivityChangeListener {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_login)

        buttonLogin.setOnClickListener() {
            var intent=Intent(this,HomepageActivity::class.java)
            startActivity(intent)
        }

        buttonRegister.setOnClickListener() {
            var intent=Intent(this,RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    override fun changeActivity(activity: AppCompatActivity) {
        val intent = Intent(this, activity::class.java)
        startActivity(intent)
        finish()
    }



}