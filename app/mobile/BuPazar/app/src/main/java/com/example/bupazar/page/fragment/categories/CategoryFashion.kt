package com.example.bupazar.page.fragment.categories

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.bupazar.R
import com.example.bupazar.model.CategoryRequest
import com.example.bupazar.model.SubCategoryRequest
import kotlinx.android.synthetic.main.fragment_fashion_category.*
import kotlinx.android.synthetic.main.fragment_fashion_category.buttonShowAll
import kotlinx.android.synthetic.main.fragment_fashion_category.categoriesText
import kotlinx.android.synthetic.main.fragment_home_category.*


/**
 * A simple CategoryFashion [Fragment] subclass.
 * Use the [CategoryFashion.newInstance] factory method to
 * create an instance of this fragment.
 */
class CategoryFashion : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_fashion_category, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonShowAll.setOnClickListener() {
            val categoryRequest = CategoryRequest(
                    CategoryName = "Fashion"
            )
            val categoryProductsFragment = CategoryProductsFragment()
            categoryProductsFragment.categoryRequest = categoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  categoryProductsFragment)
                commit()
            }
        }

        womanClothing.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "WomanClothing"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        categoriesText.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "WomanClothing"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        accessory.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Accessory"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        sportsWear.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Sportswear"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        manClothing.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "ManClothing"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        shoesBags.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Shoes&Bags"
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