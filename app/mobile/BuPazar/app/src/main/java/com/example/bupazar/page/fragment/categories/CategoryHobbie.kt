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
import kotlinx.android.synthetic.main.fragment_hobbie_category.*
import kotlinx.android.synthetic.main.fragment_sports_category.*

/**
 * A simple CategoryHobbie [Fragment] subclass.
 * Use the [CategoryHobbie.newInstance] factory method to
 * create an instance of this fragment.
 */
class CategoryHobbie : Fragment() {

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_hobbie_category, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonShowAllHobbies.setOnClickListener() {
            val categoryRequest = CategoryRequest(
                    CategoryName = "Hobbies"
            )
            val categoryProductsFragment = CategoryProductsFragment()
            categoryProductsFragment.categoryRequest = categoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  categoryProductsFragment)
                commit()
            }
        }

        bookMagazine.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Book&Magazine"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        musicalInstrument.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "MusicalInstrument"
            )
            val subCategoryProductsFragment = SubCategoryProductsFragment()
            subCategoryProductsFragment.subCategoryRequest = subCategoryRequest
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper,  subCategoryProductsFragment)
                commit()
            }
        }

        art.setOnClickListener() {
            val subCategoryRequest = SubCategoryRequest(
                    SubCategoryName = "Art"
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