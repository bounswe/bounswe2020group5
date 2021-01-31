package com.example.bupazar.page.fragment

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.PasswordChangeRequest
import com.example.bupazar.page.activity.login.VendorHomepageActivity
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_change_password.*

/**
 * A simple ChangePasswordFragment [Fragment] subclass.
 * Use the [ChangePasswordFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ChangePasswordFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_change_password, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        updatePassword.setOnClickListener(){

            val currentPassword = currentPassword.text.toString()
            val newPassword =  newPassword.text.toString()
            val newPasswordRepeat = newPasswordRepeat.text.toString()
            when {
                newPassword != newPasswordRepeat -> {
                    Toast.makeText(this.activity,"New passwords must match", Toast.LENGTH_SHORT).show()
                }
                newPassword.length < 8 -> {
                    Toast.makeText(this.activity,"Passwords must be at least 8 characters", Toast.LENGTH_SHORT).show()
                }

                else -> {
                    val passwordChangeRequest = PasswordChangeRequest(
                        currentPassword = currentPassword,
                        newPassword = newPassword
                    )
                    val apiService = RestApiService()
                    apiService.changePassword(passwordChangeRequest) {
                        if(it?.success == null) {
                            Toast.makeText(this.activity,"Current or new password is wrong.", Toast.LENGTH_SHORT).show()
                        } else{
                            Toast.makeText(this.activity,"Password is successfully changed", Toast.LENGTH_SHORT).show()
                            if(User.isVendor) {
                                var intent = Intent(activity, VendorHomepageActivity::class.java)
                                startActivity(intent)
                            }
                            else {
                                requireActivity().supportFragmentManager.beginTransaction().apply {
                                    replace(R.id.fl_wrapper, ProfilePageFragment())
                                    commit()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}