package com.example.bupazar.page.activity.login

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.bupazar.R
import kotlinx.android.synthetic.main.fragment_register.*

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_register)
        progressBarHide()

        buttonRegister.setOnClickListener {
            progressBarShow()
        }
    }

    private fun progressBarShow(){
        progress_Bar.visibility = View.VISIBLE
    }
    private fun progressBarHide(){
        progress_Bar.visibility = View.INVISIBLE
    }
}