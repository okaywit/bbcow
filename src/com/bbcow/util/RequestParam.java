package com.bbcow.util;

import com.alibaba.fastjson.JSONObject;

/**
 * Json����
 * 
 * @author ���Face
 */
public class RequestParam {
        public void toParam(String message) {
                JSONObject object = JSONObject.parseObject(message);
        }
}
