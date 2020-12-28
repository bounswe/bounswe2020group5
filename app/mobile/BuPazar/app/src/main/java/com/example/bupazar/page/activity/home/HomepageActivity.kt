package com.example.bupazar.page.activity.home



import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.bupazar.R
import com.example.bupazar.model.CreditCard
import com.example.bupazar.model.LoginResponse
import com.example.bupazar.page.fragment.*
import kotlinx.android.synthetic.main.homepage_activity.*

class HomepageActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.homepage_activity)
        val userData = intent.getSerializableExtra("USERDATA") as? LoginResponse

        val bundle = Bundle()
        bundle.putSerializable("USERDATA",userData)

        val homepageFragment = HomepageFragment()
        val categoriesFragment = CategoriesFragment()
        val cartFragment = CartFragment()
        val favoritesFragment = FavoritesFragment()
        val myAccountFragment = MyAccountFragment()

        myAccountFragment.arguments = bundle
        homepageFragment.arguments = bundle
        cartFragment.arguments = bundle

        makeCurrentFragment(homepageFragment)

        bottom_navigation.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.ic_home -> makeCurrentFragment(homepageFragment)
                R.id.ic_categories -> makeCurrentFragment(categoriesFragment)
                R.id.ic_basket -> makeCurrentFragment(cartFragment)
                R.id.ic_favorites -> makeCurrentFragment(favoritesFragment)
                R.id.ic_accounts -> makeCurrentFragment(myAccountFragment)
            }
            true
        }
    }

    private fun makeCurrentFragment(fragment: Fragment) =
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper, fragment)
                commit()
            }
}