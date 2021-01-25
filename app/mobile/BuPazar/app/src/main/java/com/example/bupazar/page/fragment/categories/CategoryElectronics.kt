package com.example.bupazar.page.fragment.categories

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import com.example.bupazar.model.*
import kotlinx.android.synthetic.main.fragment_electronics_category.*
import kotlinx.android.synthetic.main.fragment_electronics_category.buttonShowAll
import kotlinx.android.synthetic.main.fragment_home_category.*

/**
 * A simple CategoryElectronics [Fragment] subclass.
 * Use the [CategoryElectronics.newInstance] factory method to
 * create an instance of this fragment.
 */
class CategoryElectronics : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_electronics_category, container, false)
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonShowAll.setOnClickListener() {
            val categoryRequest = CategoryRequest(
                    CategoryName = "Electronics"
            )
            val categoryProductsFragment = CategoryProductsFragment()
            categoryProductsFragment.categoryRequest = categoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  categoryProductsFragment)
                commit()
            }
        }

        pctablet.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "PC&Tablet"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }

        }

        smartPhone.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Smartphone"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }

        }

        whiteAppliances.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "WhiteAppliances"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }

        }

        photoCamera.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Photo&Camera"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        gameConsoles.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Game&GameConsole"
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