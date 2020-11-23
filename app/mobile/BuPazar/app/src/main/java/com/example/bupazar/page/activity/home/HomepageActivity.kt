package com.example.bupazar.page.activity.home

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import kotlinx.android.synthetic.main.homepage_activity.*

class HomepageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.homepage_activity)

        recycle_view.apply {
            layoutManager = LinearLayoutManager(this@HomepageActivity)
            //adapter = ProductsAdapter()
        }
    }
}