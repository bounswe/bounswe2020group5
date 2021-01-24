package com.example.bupazar.page.activity.message

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.Chat
import com.example.bupazar.model.ChatAdapter
import com.example.bupazar.model.ChatCreateRequest
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.activity_message_main.*

class MessageMainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_message_main)

        createChats()

/*        btnCreateChat.setOnClickListener() {
            val chatCreateRequest = ChatCreateRequest(
                     vendorUsername.text.toString()
            )

            val apiService = RestApiService()
            apiService.chatCreate(chatCreateRequest) {
                if(it?.chatId != null) {
//                    createChats() // Uncomment it if you wanna update the chat list before changing the intent
                    vendorUsername.text.clear()
                    var intent = Intent(this, ChatActivity::class.java)
                    intent.putExtra("chatId", it.chatId)
                    startActivity(intent)
                }
            }
        } */
    }

    private fun createChats() {
        val apiService = RestApiService()
        apiService.getAllChats {
            if (it == null) {

            }
            else {
                val chatAdapter =  ChatAdapter(this, it)
                chatList.adapter = chatAdapter
                chatList.layoutManager = GridLayoutManager(this, 1)
                chatAdapter.onItemClick = { chat ->
                    var intent = Intent(this, ChatActivity::class.java)
                    intent.putExtra("chatId", chat.chatId)
                    startActivity(intent)
                }
            }
        }
    }

}