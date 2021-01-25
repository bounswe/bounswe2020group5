package com.example.bupazar.page.activity.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.page.activity.message.MessageMainActivity
import com.example.bupazar.page.fragment.ProfilePageFragment
import kotlinx.android.synthetic.main.activity_vendor_homepage.*
import kotlinx.android.synthetic.main.activity_vendor_homepage.accountPageUserNameTextView
import kotlinx.android.synthetic.main.activity_vendor_homepage.logoutLayout
import kotlinx.android.synthetic.main.activity_vendor_homepage.messagesLayout
import kotlinx.android.synthetic.main.activity_vendor_homepage.personalInfoLayout

class VendorHomepageActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vendor_homepage)

        accountPageUserNameTextView.text = "${User?.firstName} ${User?.lastName}"
        accountPageUserEmail.text = "${User?.userEmail}"

        logoutLayout.setOnClickListener {
            val intent= Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        messagesLayout.setOnClickListener() {
            var intent= Intent(this, MessageMainActivity::class.java)
            startActivity(intent)
        }


        personalInfoLayout.setOnClickListener {
            val profilePage = ProfilePageFragment()
            activity_vendor_2.visibility = View.GONE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.activity_vendor_1,  profilePage)
                commit()
            }
        }
    }
}