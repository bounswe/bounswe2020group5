package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.bupazar.ChangePasswordFragment
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.LoginResponse
import kotlinx.android.synthetic.main.fragment_profile_page.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [ProfilePageFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ProfilePageFragment : Fragment() {
    var userData : LoginResponse? = null
    lateinit var NameTextView: TextView
    lateinit var surNameTextView: TextView
    lateinit var userNameTextView: TextView
    lateinit var mailTextView: TextView
    lateinit var addressTextView: TextView
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_profile_page, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        NameTextView = view.findViewById(R.id.name)
        NameTextView.text = User.firstName
        surNameTextView = view.findViewById(R.id.surname)
        surNameTextView.text = User.lastName
        userNameTextView = view.findViewById(R.id.username)
        userNameTextView.text = User.userName
        mailTextView = view.findViewById(R.id.email)
        mailTextView.text = User.userEmail
        addressTextView = view.findViewById(R.id.address)
        addressTextView.text = User.address

        buttonEdit.setOnClickListener(){
            val editProfileInfoFragment = EditProfileInfoFragment()
            val bundle = Bundle()
            editProfileInfoFragment.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  editProfileInfoFragment)
                commit()
            }
        }

        buttonChangePassword.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  ChangePasswordFragment())
                commit()
            }
        }
    }
}