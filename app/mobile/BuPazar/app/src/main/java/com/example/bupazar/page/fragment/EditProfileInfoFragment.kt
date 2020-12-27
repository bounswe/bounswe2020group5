package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.bupazar.R
import com.example.bupazar.model.LoginResponse
import kotlinx.android.synthetic.main.fragment_edit_profile_info.*
import kotlinx.android.synthetic.main.fragment_profile_page.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [EditProfileInfoFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class EditProfileInfoFragment : Fragment() {

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
        userData = arguments?.getSerializable("USERDATA") as LoginResponse
        return inflater.inflate(R.layout.fragment_edit_profile_info, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        NameTextView = view.findViewById(R.id.editName)
        NameTextView.text = "${userData?.firstName}"
        surNameTextView = view.findViewById(R.id.editSurname)
        surNameTextView.text = "${userData?.lastName}"
        userNameTextView = view.findViewById(R.id.editUserName)
        userNameTextView.text = "${userData?.userName}"
        mailTextView = view.findViewById(R.id.editEmail)
        mailTextView.text = "${userData?.userEmail}"
        addressTextView = view.findViewById(R.id.editAddress)
        addressTextView.text = "${userData?.address}"

        buttonSave.setOnClickListener(){  // TODO user info should be saved
            val profilePage = ProfilePageFragment()
            val bundle = Bundle()
            bundle.putSerializable("USERDATA",userData)
            profilePage.arguments = bundle
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  profilePage)
                commit()
            }
        }
    }
}