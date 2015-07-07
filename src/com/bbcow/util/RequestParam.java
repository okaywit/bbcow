package com.bbcow.util;

import com.alibaba.fastjson.JSONObject;

/**
 * Json解析
 * 
 * @author 大辉Face
 */
public class RequestParam {
        public final static int MESSAGE_TYPE_ERROR = 0; //错误信息类型
        public final static int MESSAGE_TYPE_AD = 1;//推广类型
        public final static int MESSAGE_TYPE_CHAT = 2;//聊天类型
        public final static int MESSAGE_TYPE_PUSH = 3;//聊天类型

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
