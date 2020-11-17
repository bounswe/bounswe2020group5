package com.example.bupazar.page.activity.login

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.FirebaseApp
import com.example.bupazar.R
import com.example.bupazar.`interface`.ActivityChangeListener
import com.example.bupazar.core.BaseActivity

class LoginActivity : BaseActivity(), ActivityChangeListener {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        FirebaseApp.initializeApp(applicationContext)
    }

    override fun changeActivity(activity: AppCompatActivity) {
        val intent = Intent(this, activity::class.java)
        startActivity(intent)
        finish()
    }



}