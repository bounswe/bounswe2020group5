package com.example.bupazar.page.fragment.categories

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import com.example.bupazar.page.activity.home.HomepageActivity
import kotlinx.android.synthetic.main.fragment_home_category.*
import kotlinx.android.synthetic.main.fragment_personal_care_category.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [CategoryPersonalCare.newInstance] factory method to
 * create an instance of this fragment.
 */
class CategoryPersonalCare : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_personal_care_category, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        perfume.setOnClickListener() {
            val intent= Intent(this.activity, HomepageActivity::class.java)
            startActivity(intent)
        }

        makeup.setOnClickListener() {
            val intent= Intent(this.activity, HomepageActivity::class.java)
            startActivity(intent)
        }

        skinCare.setOnClickListener() {
            val intent= Intent(this.activity, HomepageActivity::class.java)
            startActivity(intent)
        }

        oralCare.setOnClickListener() {
            val intent= Intent(this.activity, HomepageActivity::class.java)
            startActivity(intent)
        }

        hairCare.setOnClickListener() {
            val intent= Intent(this.activity, HomepageActivity::class.java)
            startActivity(intent)
        }
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment CategoryPersonalCare.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            CategoryPersonalCare().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}