package com.example.lecturetracker

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.lecturetracker.fragments.AccountFragment
import com.example.lecturetracker.fragments.ManageFragment
import com.example.lecturetracker.fragments.OverviewFragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.color.DynamicColors
import com.google.android.material.color.DynamicColorsOptions

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        DynamicColors.applyToActivitiesIfAvailable(application)


        val overviewFragment: OverviewFragment = OverviewFragment()
        val manageFragment: ManageFragment = ManageFragment()
        val accountFragment: AccountFragment = AccountFragment()

        setCurrentFragment(overviewFragment)

        findViewById<BottomNavigationView>(R.id.bottomNavigationView).setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.overview_button -> setCurrentFragment(overviewFragment)
                R.id.manage_button -> setCurrentFragment(manageFragment)
                R.id.account_button -> setCurrentFragment(accountFragment)
            }
            true
        }



//        val intent = Intent(this, LoginActivity::class.java)
//        startActivity(intent)
    }

    private fun setCurrentFragment(fragment: Fragment) =
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.flFragment, fragment)
            commit()
        }
}