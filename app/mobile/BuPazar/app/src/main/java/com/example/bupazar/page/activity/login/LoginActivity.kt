package com.example.bupazar.page.activity.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.bupazar.R
import com.example.bupazar.`interface`.ActivityChangeListener
import com.example.bupazar.core.BaseActivity
import com.example.bupazar.model.ForgotPasswordRequest
import com.example.bupazar.model.LoginRequest
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.page.activity.home.HomepageActivity
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_forgot_password.*
import kotlinx.android.synthetic.main.fragment_login.*
import kotlinx.android.synthetic.main.fragment_login.buttonRegister
import kotlinx.android.synthetic.main.fragment_login.passwordEditTextView
import kotlinx.android.synthetic.main.fragment_login.usernameEditTextView
import kotlinx.android.synthetic.main.fragment_register.*

class LoginActivity : BaseActivity(), ActivityChangeListener {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_login)

        buttonLogin.setOnClickListener() {

            if (usernameEditTextView.text.isEmpty() || passwordEditTextView.text.isEmpty()){
                Toast.makeText(this@LoginActivity,"Username and Password is required to login", Toast.LENGTH_SHORT).show()
            }
            else {
                val apiService = RestApiService()
                val userInfo = LoginRequest(
                        userEmail = usernameEditTextView.text.toString(),
                        userPassword = passwordEditTextView.text.toString()
                )
                apiService.userLogin(userInfo) {
                    if(it?.userEmail == null){
                        Toast.makeText(this@LoginActivity,"Wrong username or password", Toast.LENGTH_SHORT).show()
                    }
                    else {
                        var intent = Intent(this, HomepageActivity::class.java)
                        intent.putExtra("USERDATA", it)
                        startActivity(intent)
                    }
                }
            }
        }

        buttonRegister.setOnClickListener() {
            var intent=Intent(this,RegisterActivity::class.java)
            startActivity(intent)
        }

        buttonGuest.setOnClickListener() {
            var intent=Intent(this,HomepageActivity::class.java)
            startActivity(intent)
        }

        textViewForgotPassword.setOnClickListener(){
            setContentView(R.layout.fragment_forgot_password)
            resetButton.setOnClickListener(){

                if (mailView.text.isEmpty()){

                    Toast.makeText(this@LoginActivity,"Please type your email address!", Toast.LENGTH_SHORT).show()
                }
                else {

                    val apiService = RestApiService()
                    val forgotPassword = ForgotPasswordRequest(
                        userMail = mailView.text.toString(),
                    )
                    apiService.forgotPassword(forgotPassword) {
                        // TODO: response back as null email cannot be checked.
                        /*
                        if(it?.userMail == null){
                            Toast.makeText(this@LoginActivity,"Wrong Email address", Toast.LENGTH_SHORT).show()
                        }
                        else {
                            Toast.makeText(this@LoginActivity,"Reset password mail is sent", Toast.LENGTH_SHORT).show()
                            var intent = Intent(this, LoginActivity::class.java)
                            startActivity(intent)
                        }*/
                        Toast.makeText(this@LoginActivity,"Reset password mail is sent", Toast.LENGTH_SHORT).show()
                        var intent = Intent(this, LoginActivity::class.java)
                        startActivity(intent)
                    }
                }
            }
        }

    }

    override fun changeActivity(activity: AppCompatActivity) {
        val intent = Intent(this, activity::class.java)
        startActivity(intent)
        finish()
    }

}