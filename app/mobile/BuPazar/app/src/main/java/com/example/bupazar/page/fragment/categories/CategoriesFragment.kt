/*
* Created by Sertay Akpinar
* Fragment class to let the user to review categories.
*/
package com.example.bupazar.page.fragment.categories

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import kotlinx.android.synthetic.main.fragment_categories.*


/**
 * A simple CategoriesFragment subclass.
 * Use the [CategoriesFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class CategoriesFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_categories, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        electronics.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  CategoryElectronics())
                commit()
            }
        }

        fashion.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  CategoryFashion())
                commit()
            }
        }

        personalCare.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  CategoryPersonalCare())
                commit()
            }
        }

        home.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  CategoryHome())
                commit()
            }
        }

        sports.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  CategorySports())
                commit()
            }
        }

        hobbie.setOnClickListener(){
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  CategoryHobbie())
                commit()
            }
        }
    }

    companion object {
        @JvmStatic fun newInstance() =
                CategoriesFragment().apply {
                    arguments = Bundle().apply {
                    }
                }
    }
}