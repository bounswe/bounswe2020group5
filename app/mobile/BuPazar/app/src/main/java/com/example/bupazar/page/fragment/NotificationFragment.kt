package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.bupazar.R
import com.example.bupazar.model.HomepageProductAdapter
import com.example.bupazar.model.NotificationAdapter
import com.example.bupazar.model.NotificationResponse
import com.example.bupazar.service.RestApiService

private const val ARG_AUTH_TOKEN = "authToken"

class NotificationFragment : Fragment() {

    private var authToken: String? = null
    private lateinit var rcView: RecyclerView



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_notification, container, false)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            authToken = it.getString(ARG_AUTH_TOKEN)
            authToken = "Token " + authToken
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rcView = view.findViewById(R.id.rvNotification)

        val apiService = RestApiService()

        apiService.myNotification() {
            if(it == null){

            }
            else {
                val notifications : Array<NotificationResponse> = it
                val notificationAdapter = this.context?.let { NotificationAdapter(it, notifications) }
                rcView.layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
                rcView.adapter = notificationAdapter
            }
        }
    }

    companion object {
        @JvmStatic
        fun newInstance(authToken: String?) =
            NotificationFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_AUTH_TOKEN, authToken)
                }
            }
    }
}