package com.example.bupazar

import android.app.Application
import com.example.bupazar.model.CreditCard

class User:Application() {
    companion object {
        lateinit var user: String
        lateinit var authToken: String // Suppress the warning, IDE gives error for this line(getter sette) onu sessize al (kayacana yaz burada sorun cikarsa)
        lateinit var chosenCreditCard: CreditCard
    }
}