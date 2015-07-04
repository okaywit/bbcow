package com.bbcow.util;

import com.alibaba.fastjson.JSONObject;

/**
 * Json½âÎö
 * 
 * @author ´ó»ÔFace
 */
public class RequestParam {
        public void toParam(String message) {
                JSONObject object = JSONObject.parseObject(message);
        }
}
