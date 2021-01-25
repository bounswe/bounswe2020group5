package com.example.bupazar

import android.app.Application

class User:Application() {
    companion object {
        var userName: String? = null
        var firstName: String? = null
        var lastName: String? = null
        var userEmail: String? = null
        var address: String? = null
        var authToken: String? = null // Suppress the warning, IDE gives error for this line(getter sette) onu sessize al (kayacana yaz burada sorun cikarsa)
    }
}