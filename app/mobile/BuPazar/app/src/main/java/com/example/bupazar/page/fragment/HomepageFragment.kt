package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.Product
import com.example.bupazar.model.ProductAdapter
import kotlinx.android.synthetic.main.fragment_homepage.*
// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

class HomepageFragment : Fragment() {
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

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_homepage, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val products = createProducts()
        rvProducts.adapter = this.context?.let { ProductAdapter(it, products) }
        rvProducts.layoutManager = LinearLayoutManager(this.context)
    }

    private fun createProducts(): List<Product> {
        val products = mutableListOf<Product>()
        val name = arrayOf("Holy book",
            "Gore-tex  Jacket",
            "Adosdas FreeRuning",
            "Cafcafli Socks",
            "MyPhone 2x+5",
            "MyPhone 2x+5",
            "MyPhone 2x+5",
            "Cafcafli Socks")
        val descs = arrayOf("$12.25",
            "$89.99",
            "$40.99",
            "$5.99",
            "$999.99",
            "$999.99",
            "$999.99",
            "$5.99")
        for (i in 0..7) products.add(Product(name = name.get(i), description = descs.get(i), productNo = i))
        return products
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment HomepageFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic fun newInstance(param1: String, param2: String) =
                HomepageFragment().apply {
                    arguments = Bundle().apply {
                        putString(ARG_PARAM1, param1)
                        putString(ARG_PARAM2, param2)
                    }
                }
    }
}