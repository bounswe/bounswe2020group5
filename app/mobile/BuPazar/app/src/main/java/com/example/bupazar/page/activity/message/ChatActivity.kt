package com.example.bupazar.page.activity.message

import android.content.Context
import android.os.Bundle
import android.view.inputmethod.InputMethodManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.User
import com.example.bupazar.model.ChatRequest
import com.example.bupazar.model.MessageAdapter
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.activity_chat.*
import java.util.*
import kotlin.concurrent.timerTask


class ChatActivity : AppCompatActivity() {

    private lateinit var adapter: MessageAdapter
    private var chatId: Int = 0
    private var lastMessageId = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)
        chatId = intent.getSerializableExtra("chatId") as Int

        messageList.layoutManager = LinearLayoutManager(this)
        adapter = MessageAdapter(this)
        messageList.adapter = adapter

        btnSend.setOnClickListener {
            if(txtMessage.text.isNotEmpty()) {
                val chatRequest = ChatRequest(
                    chatId.toString(),
                    txtMessage.text.toString()
                )
                User.authToken?.let { it1 ->
                    RestApiService().sendMessage(it1, chatRequest){
                        resetInput()
                        if (it?.success == null) {
                            Toast.makeText(applicationContext,"Response was not successful", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            } else {
                Toast.makeText(applicationContext,"Message should not be empty", Toast.LENGTH_SHORT).show()
            }
        }

        Timer().scheduleAtFixedRate(timerTask {
            checkLast()
        },0,2000)
    }

    private fun resetInput() {
        // Clean text box
        txtMessage.text.clear()

        // Hide keyboard
        val inputManager =
            getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        inputManager.hideSoftInputFromWindow(
            currentFocus!!.windowToken, InputMethodManager.HIDE_NOT_ALWAYS
        )
    }

    private fun checkLast() {
        val chatIdRequest = ChatRequest(
            chatId.toString(),
            null
        )
        User.authToken?.let { it ->
            RestApiService().getLastMessage(it, chatIdRequest) {
                if (it?.messageId != null && (it.messageId!=lastMessageId)) {
                    runOnUiThread {
                        adapter.addMessage(it)
                        // scroll the RecyclerView to the last added element
                        messageList.scrollToPosition(adapter.itemCount - 1)
                    }
                    lastMessageId = it.messageId!!
                }
            }
        }
    }
}
