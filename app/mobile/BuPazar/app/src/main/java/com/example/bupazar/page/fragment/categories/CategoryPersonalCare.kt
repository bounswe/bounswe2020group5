/*
* Created by Sertay Akpinar
* Fragment class to let the user to review subcategories in personal care.
*/
package com.example.bupazar.page.fragment.categories

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import com.example.bupazar.model.CategoryRequest
import com.example.bupazar.model.SubCategoryRequest
import kotlinx.android.synthetic.main.fragment_personal_care_category.*
import kotlinx.android.synthetic.main.fragment_personal_care_category.buttonShowAll

/**
 * A simple CategoryPersonalCare [Fragment] subclass.
 */
class CategoryPersonalCare : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_personal_care_category, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonShowAll.setOnClickListener {
            val categoryRequest = CategoryRequest(
                    CategoryName = "Personal"
            )
            val categoryProductsFragment = CategoryProductsFragment()
            categoryProductsFragment.categoryRequest = categoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  categoryProductsFragment)
                commit()
            }
        }

        perfume.setOnClickListener {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Perfume"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        makeup.setOnClickListener {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Makeup"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        skinCare.setOnClickListener {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "SkinCare"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        oralCare.setOnClickListener {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "OralCare"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        hairCare.setOnClickListener {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "HairCare"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }
    }
}