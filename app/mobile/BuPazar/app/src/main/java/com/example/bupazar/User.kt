package com.example.bupazar

import android.app.Application

class User:Application() {
    companion object {
        lateinit var userName: String
        lateinit var firstName: String
        lateinit var lastName: String
        lateinit var userEmail: String
        lateinit var address: String
        lateinit var authToken: String // Suppress the warning, IDE gives error for this line(getter sette) onu sessize al (kayacana yaz burada sorun cikarsa)
    }
}