package com.bbcow.filter;

import com.alibaba.fastjson.JSONObject;

/**
 * 指令检测链-协议
 */
public class ProtocolFilter extends AbstractFilter {

        @Override
        public boolean filter(String message) {
                JSONObject object = JSONObject.parseObject(message);
                long cId = object.getLong("cId");

                boolean flag = false;
                if (cId < 2)
                        flag = true;

                if (flag)
                        return this.nextFilter.filter(object.getString("data"));
                return flag;
        }

}
