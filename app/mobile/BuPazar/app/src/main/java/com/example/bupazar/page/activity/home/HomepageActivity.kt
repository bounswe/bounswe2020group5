package com.example.bupazar.page.activity.home

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.Product
import com.example.bupazar.model.ProductAdapter
import com.example.bupazar.page.activity.login.LoginActivity
import kotlinx.android.synthetic.main.homepage_activity.*

class HomepageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.homepage_activity)

        val products = createProducts()
        rvProducts.adapter = ProductAdapter(this, products)
        rvProducts.layoutManager = LinearLayoutManager(this)


        buttonLogOut.setOnClickListener(){
            var intent= Intent(this,LoginActivity::class.java)
            startActivity(intent)
        }
    }

    private fun createProducts(): List<Product> {
        val products = mutableListOf<Product>()
        for (i in 1..150) products.add(Product(name = "Product #$i", description = "Description #$i", productNo = i))
        return products
    }


}