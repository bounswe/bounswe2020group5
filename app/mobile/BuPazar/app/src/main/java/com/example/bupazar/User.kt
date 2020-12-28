package com.example.bupazar

import android.app.Application

class User:Application() {
    companion object {
        lateinit var user: String
        lateinit var authToken: String
    }
}