package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import com.example.bupazar.ChangePasswordFragment
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.EditPersonalInfoRequest
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_edit_profile_info.*

/**
 * A simple [Fragment] subclass.
 * Use the [EditProfileInfoFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class EditProfileInfoFragment : Fragment() {

    lateinit var NameTextView: TextView
    lateinit var surNameTextView: TextView
    lateinit var userNameTextView: TextView
    lateinit var mailTextView: TextView
    lateinit var addressTextView: TextView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_edit_profile_info, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        NameTextView = view.findViewById(R.id.editName)
        NameTextView.text = User.firstName
        surNameTextView = view.findViewById(R.id.editSurname)
        surNameTextView.text = User.lastName
        userNameTextView = view.findViewById(R.id.editUserName)
        userNameTextView.text = User.userEmail
        mailTextView = view.findViewById(R.id.editEmail)
        mailTextView.text = User.userEmail
        addressTextView = view.findViewById(R.id.editAddress)
        addressTextView.text = User.address


        buttonChangePassword.setOnClickListener{
            val changePasswordFragment = ChangePasswordFragment()
            val bundle = Bundle()
            bundle.putSerializable("USERDATA",userData) // TODO bu olacak mı emin değilim.
            changePasswordFragment.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper, changePasswordFragment)
                commit()
            }
        }

        buttonSave.setOnClickListener{
            if (userNameTextView.text.isEmpty() ||  mailTextView.text.isEmpty() ||
                    NameTextView.text.isEmpty() || surNameTextView.text.isEmpty() ||
                    addressTextView.text.isEmpty()) {
                Toast.makeText(
                        this.activity,
                        "User information fields should not be empty.",
                        Toast.LENGTH_SHORT).show()
            } else {
                val apiService = RestApiService()
                val editUserInfo = EditPersonalInfoRequest(
                        userName = editUserName.text.toString(),
                        userFirstName = editName.text.toString(),
                        userLastName = editSurname.text.toString(),
                        userAddress = editAddress.text.toString(),
                )

                apiService.editProfileInfo(editUserInfo) {
                    if(it?.success == null){  // TODO bu if'e giriyor nedenini anlamadık. w/emre
                        Toast.makeText(this.activity,"User info credentials are not valid." ,
                                Toast.LENGTH_SHORT).show()
                    }
                    else {
                        Toast.makeText(this.activity,"You have successfully edited your " +
                                "personal info." , Toast.LENGTH_SHORT).show()
                        if(editUserInfo.userName!=null)
                            User.userName = editUserInfo.userName!!
                        User.firstName = editUserInfo.userFirstName!!
                        User.lastName = editUserInfo.userLastName!!
                        User.address = editUserInfo.userAddress!!


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