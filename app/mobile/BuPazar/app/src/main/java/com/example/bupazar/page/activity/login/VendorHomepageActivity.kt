package com.example.bupazar.page.activity.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.page.activity.message.MessageMainActivity
import com.example.bupazar.page.fragment.ProfilePageFragment
import com.example.bupazar.page.fragment.VendorOrdersFragment
import com.example.bupazar.page.fragment.register.PreviousOrdersFragment
import kotlinx.android.synthetic.main.activity_vendor_homepage.*
import kotlinx.android.synthetic.main.activity_vendor_homepage.accountPageUserEmail
import kotlinx.android.synthetic.main.activity_vendor_homepage.accountPageUserNameTextView
import kotlinx.android.synthetic.main.activity_vendor_homepage.logoutLayout
import kotlinx.android.synthetic.main.activity_vendor_homepage.messagesLayout
import kotlinx.android.synthetic.main.activity_vendor_homepage.ordersLayout
import kotlinx.android.synthetic.main.activity_vendor_homepage.personalInfoLayout
import kotlinx.android.synthetic.main.fragment_my_account.*

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

        addProductLayout.setOnClickListener() {
            var intent= Intent(this, AddProduct::class.java)
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

        /*
        If the orders layout is pressed by the user, go to orders fragment.
         */
        ordersLayout.setOnClickListener {
            val vendorOrdersPage = VendorOrdersFragment()
            val bundle = Bundle()
            bundle.putSerializable("authToken",User.authToken)
            vendorOrdersPage.arguments = bundle
            activity_vendor_2.visibility = View.INVISIBLE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.activity_vendor_1,  vendorOrdersPage)
                commit()
            }
        }
    }
}