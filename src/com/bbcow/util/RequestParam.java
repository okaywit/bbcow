package com.bbcow.util;

import com.alibaba.fastjson.JSONObject;

/**
 * Json解析
 * 
 * @author 大辉Face
 */
public class RequestParam {
        public static void toParam(String message) {
                JSONObject object = JSONObject.parseObject(message);
        }

        /**
         * 返回Json
         * 格式：{"type":"","data":"{}"}
         */
        public static String returnJson(int type, String message) {
                return "{\"type\":" + type + ",\"data\":" + message + "}";
        }
}
