package com.example.bupazar.page.activity.login

import android.Manifest
import android.app.Activity
import android.app.ProgressDialog
import android.content.ContentUris
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.DocumentsContract
import android.provider.MediaStore
import android.util.Log
import android.webkit.MimeTypeMap
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.example.bupazar.R
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.activity_add_product.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File


class AddProduct : AppCompatActivity() {
    val REQUEST_CODE = 100
    lateinit var fileNameG : String
    lateinit var requestFileG : RequestBody
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_product)

        verifyStoragePermissions(this)

        addProductImage.setOnClickListener{
            openGalleryForImage()
        }


        buttonAddProduct.setOnClickListener {

            val name = productNameEdit.text.toString().trim()
            val price = priceEdit.text.toString().trim()
            val stock = stockNumberEdit.text.toString().trim()
            val description = descriptionEdit.text.toString().trim()
            val subcategory = subcategoryEdit.text.toString().trim()
            val brand = brandNameEdit.text.toString().trim()
            val image_file = MultipartBody.Part.createFormData("photo", fileNameG, requestFileG!!)

            RestApiService().addProduct(
                name,
                price,
                stock,
                description,
                subcategory,
                brand,
                image_file
            ) {
                Toast.makeText(this, "Product is added.", Toast.LENGTH_SHORT).show()
                var intent = Intent(this, VendorHomepageActivity::class.java)
                startActivity(intent)
            }

        }

    }


    private fun openGalleryForImage() {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, REQUEST_CODE)
    }

    private val REQUEST_EXTERNAL_STORAGE = 1
    private val PERMISSIONS_STORAGE = arrayOf<String>(
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.WRITE_EXTERNAL_STORAGE
    )

    /**
     * Checks if the app has permission to write to device storage
     *
     * If the app does not has permission then the user will be prompted to grant permissions
     *
     * @param activity
     */
    fun verifyStoragePermissions(activity: Activity?) {
        // Check if we have write permission
        val permission: Int =
            ActivityCompat.checkSelfPermission(activity!!, Manifest.permission.WRITE_EXTERNAL_STORAGE)
        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                activity,
                PERMISSIONS_STORAGE,
                REQUEST_EXTERNAL_STORAGE
            )
        }
    }
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && requestCode == REQUEST_CODE) {
            UploadUtility(this).uploadFile(data?.data!!)
        }
    }

    inner class UploadUtility(activity: Activity) {

        var activity = activity;
        var dialog: ProgressDialog? = null
        var serverURL: String = "server url"
        val client = OkHttpClient()

        fun uploadFile(sourceFilePath: String, uploadedFileName: String? = null) {
            uploadFile(File(sourceFilePath), uploadedFileName)
        }

        fun uploadFile(sourceFileUri: Uri, uploadedFileName: String? = null) {
            val pathFromUri = URIPathHelper().getPath(activity, sourceFileUri)
            uploadFile(File(pathFromUri), uploadedFileName)
        }

        private fun uploadFile(sourceFile: File, uploadedFileName: String? = null) {
                val mimeType = getMimeType(sourceFile);
                if (mimeType == null) {
                    Log.e("file error", "Not able to get mime type")
                    return
                }
                val fileName: String =
                    if (uploadedFileName == null) sourceFile.name else uploadedFileName
                toggleProgressDialog(true)
                try {

                    fileNameG = fileName
                    requestFileG = sourceFile.asRequestBody(mimeType.toMediaTypeOrNull())!!


                } catch (ex: Exception) {
                    ex.printStackTrace()
                    Log.e("File upload", "failed")
                    showToast("File uploading failed")
                }
                toggleProgressDialog(false)
        }

        // url = file path or whatever suitable URL you want.
        fun getMimeType(file: File): String? {
            var type: String? = null
            val extension = MimeTypeMap.getFileExtensionFromUrl(file.path)
            if (extension != null) {
                type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension)
            }
            return type
        }

        fun showToast(message: String) {
            activity.runOnUiThread {
                Toast.makeText(activity, message, Toast.LENGTH_LONG).show()
            }
        }

        fun toggleProgressDialog(show: Boolean) {
            activity.runOnUiThread {
                if (show) {
                    dialog = ProgressDialog.show(activity, "", "Uploading file...", true);
                } else {
                    dialog?.dismiss();
                }
            }
        }

    }
}
class URIPathHelper {

    fun getPath(context: Context, uri: Uri): String? {
        val isKitKatorAbove = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT

        // DocumentProvider
        if (isKitKatorAbove && DocumentsContract.isDocumentUri(context, uri)) {
            // ExternalStorageProvider
            if (isExternalStorageDocument(uri)) {
                val docId = DocumentsContract.getDocumentId(uri)
                val split = docId.split(":".toRegex()).toTypedArray()
                val type = split[0]
                if ("primary".equals(type, ignoreCase = true)) {
                    return Environment.getExternalStorageDirectory().toString() + "/" + split[1]
                }

            } else if (isDownloadsDocument(uri)) {
                val id = DocumentsContract.getDocumentId(uri)
                val contentUri = ContentUris.withAppendedId(
                    Uri.parse("content://downloads/public_downloads"), java.lang.Long.valueOf(
                        id
                    )
                )
                return getDataColumn(context, contentUri, null, null)
            } else if (isMediaDocument(uri)) {
                val docId = DocumentsContract.getDocumentId(uri)
                val split = docId.split(":".toRegex()).toTypedArray()
                val type = split[0]
                var contentUri: Uri? = null
                if ("image" == type) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
                } else if ("video" == type) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI
                } else if ("audio" == type) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
                }
                val selection = "_id=?"
                val selectionArgs = arrayOf(split[1])
                return getDataColumn(context, contentUri, selection, selectionArgs)
            }
        } else if ("content".equals(uri.scheme, ignoreCase = true)) {
            return getDataColumn(context, uri, null, null)
        } else if ("file".equals(uri.scheme, ignoreCase = true)) {
            return uri.path
        }
        return null
    }

    fun getDataColumn(
        context: Context,
        uri: Uri?,
        selection: String?,
        selectionArgs: Array<String>?
    ): String? {
        var cursor: Cursor? = null
        val column = "_data"
        val projection = arrayOf(column)
        try {
            cursor = uri?.let { context.getContentResolver().query(
                it,
                projection,
                selection,
                selectionArgs,
                null
            ) }
            if (cursor != null && cursor.moveToFirst()) {
                val column_index: Int = cursor.getColumnIndexOrThrow(column)
                return cursor.getString(column_index)
            }
        } finally {
            if (cursor != null) cursor.close()
        }
        return null
    }

    fun isExternalStorageDocument(uri: Uri): Boolean {
        return "com.android.externalstorage.documents" == uri.authority
    }

    fun isDownloadsDocument(uri: Uri): Boolean {
        return "com.android.providers.downloads.documents" == uri.authority
    }

    fun isMediaDocument(uri: Uri): Boolean {
        return "com.android.providers.media.documents" == uri.authority
    }
}