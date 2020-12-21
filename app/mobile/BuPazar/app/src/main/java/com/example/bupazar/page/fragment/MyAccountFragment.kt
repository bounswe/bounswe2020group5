package com.example.bupazar.page.fragment

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.bupazar.R
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.page.activity.login.LoginActivity
import com.example.bupazar.page.activity.login.RegisterActivity
import kotlinx.android.synthetic.main.fragment_my_account.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [MyAccountFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
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

        rightArrow6.setOnClickListener(){
            var intent=Intent(this.activity, LoginActivity::class.java)
            startActivity(intent)
        }
    }


}