package com.example.bupazar.model



data class Product (val name: String, val description: String, val productNo: Int){
    private val urlData = arrayOf("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2VZX0397KBcVYrj7K4vbhZHj6zPkMQPqpJw&amp;usqp=CAU"
            , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMcHcX5QR0TaJ5hYUvuFno4lfDUksgI-gPMA&amp;usqp=CAU"
            , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpQ6N7pKsyd4spN9lOmD_ND7yqvD1-I1RNw&amp;usqp=CAU"
            , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLpR0nohEuF5_KKNkvpZdGo6gI_gm9rPzdqw&amp;usqp=CAU"
            , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2OEdAAT2mRuuVS51rmNY8_08SfL5ZQ30DYQ&amp;usqp=CAU")
//    val imageUrl = "https://picsum.photos/150?random=$productNo"
    val imageUrl = urlData.get(productNo)
}