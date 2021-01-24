package com.example.bupazar.page.activity.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.`interface`.ActivityChangeListener
import com.example.bupazar.core.BaseActivity
import com.example.bupazar.model.AuthTokenRequest
import com.example.bupazar.model.ForgotPasswordRequest
import com.example.bupazar.model.LoginRequest
import com.example.bupazar.page.activity.home.HomepageActivity
import com.example.bupazar.service.RestApiService
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import kotlinx.android.synthetic.main.fragment_forgot_password.*
import kotlinx.android.synthetic.main.fragment_login.*

class LoginActivity : BaseActivity(), ActivityChangeListener {

    lateinit var mGoogleSignInClient: GoogleSignInClient
    private val RC_SIGN_IN = 9001


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_login)

        buttonLogin.setOnClickListener() {

            if (usernameEditTextView.text.isEmpty() || passwordEditTextView.text.isEmpty()){
                Toast.makeText(
                    this@LoginActivity,
                    "Username and Password is required to login",
                    Toast.LENGTH_SHORT
                ).show()
            }
            else {
                val apiService = RestApiService()
                val userInfo = LoginRequest(
                    userEmail = usernameEditTextView.text.toString(),
                    userPassword = passwordEditTextView.text.toString()
                )
                apiService.userLogin(userInfo) {
                    if(it?.userEmail == null){
                        Toast.makeText(this, "Wrong username or password", Toast.LENGTH_SHORT).show()
                    }
                    else {
                        var intent = Intent(this, HomepageActivity::class.java)
                        User.authToken = it.authToken!!
                        User.userName = it.userName!!
                        User.address = it.address!!
                        User.firstName = it.firstName!!
                        User.lastName = it.lastName!!
                        User.userEmail = it.userEmail!!
                        intent.putExtra("USERDATA", it)
                        startActivity(intent)
                    }
                }
            }
        }


        buttonRegister.setOnClickListener() {
            var intent=Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        buttonGuest.setOnClickListener() {
            User.userName = "GUEST"
            var intent=Intent(this, HomepageActivity::class.java)
            startActivity(intent)
        }

        textViewForgotPassword.setOnClickListener(){
            setContentView(R.layout.fragment_forgot_password)
            resetButton.setOnClickListener(){

                if (mailView.text.isEmpty()){

                    Toast.makeText(
                        this@LoginActivity,
                        "Please type your email address!",
                        Toast.LENGTH_SHORT
                    ).show()
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
                        Toast.makeText(
                            this@LoginActivity,
                            "Reset password mail is sent",
                            Toast.LENGTH_SHORT
                        ).show()
                        var intent = Intent(this, LoginActivity::class.java)
                        startActivity(intent)
                    }
                }
            }
        }


        val gso =
                GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(getString(R.string.default_web_client_id))
                        .requestEmail()
                        .build()

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)

        google_login_btn.setOnClickListener {
            signIn()
        }
    }

    private fun signIn() {
        val signInIntent = mGoogleSignInClient.signInIntent
        startActivityForResult(
                signInIntent, RC_SIGN_IN
        )
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == RC_SIGN_IN) {
            val task =
                    GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    private fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {

            val account = completedTask.getResult(
                    ApiException::class.java
            )
            // Signed in successfully
            val googleId = account?.id ?: ""
            Log.i("Google ID",googleId)

            val googleFirstName = account?.givenName ?: ""
            Log.i("Google First Name", googleFirstName)

            val googleLastName = account?.familyName ?: ""
            Log.i("Google Last Name", googleLastName)

            val googleEmail = account?.email ?: ""
            Log.i("Google Email", googleEmail)

            val googleProfilePicURL = account?.photoUrl.toString()
            Log.i("Google Profile Pic URL", googleProfilePicURL)

            val googleIdToken = account?.idToken ?: ""
            Log.i("Google ID Token", googleIdToken)

            val apiService = RestApiService()
            val userInfo = AuthTokenRequest(
                    authToken = googleIdToken,
            )
            apiService.googleLogin(userInfo) {
                if(it?.userEmail == null){
                    Toast.makeText(this, "User registered without Google", Toast.LENGTH_SHORT).show()
                }
                else {
                    var intent = Intent(this, HomepageActivity::class.java)
                    User.authToken = it.authToken!!
                    User.userName = it.userName!!
                    User.address = it.address!!
                    User.firstName = it.firstName!!
                    User.lastName = it.lastName!!
                    User.userEmail = it.userEmail!!
                    intent.putExtra("USERDATA", it)
                    startActivity(intent)
                }
            }

        } catch (e: ApiException) {
            // Sign in was unsuccessful
            Toast.makeText(this, "Google sign in was unsuccessful", Toast.LENGTH_SHORT).show()
            Log.e(
                    "failed code=", e.statusCode.toString()
            )
        }
    }


    override fun changeActivity(activity: AppCompatActivity) {
        val intent = Intent(this, activity::class.java)
        startActivity(intent)
        finish()
    }

}