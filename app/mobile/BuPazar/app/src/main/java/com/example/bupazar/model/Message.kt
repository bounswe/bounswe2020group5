package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class Message(
    @SerializedName("id") var messageId: Int?,
    @SerializedName("whose_message") var isCustomerMessage: Boolean?,
    @SerializedName("context") var content: String?,
    @SerializedName("chat") var chatId: Int?,
)
