package com.example.bupazar

import android.app.Application

class User:Application() {
    companion object {
        var userName: String? = null
        var firstName: String? = null
        var lastName: String? = null
        var userEmail: String? = null
        var address: String? = null
        var authToken: String? = null
        var isVendor: Boolean = false
    }
}