package com.bbcow.filter;

import com.bbcow.CowCache;

/**
 * 指令检测链-协议
 */
public class ProtocolFilter extends AbstractFilter {

        @Override
        public void filter(Message message) {

        	String head = message.originMessage.substring(message.originMessage.indexOf(":")+1, message.originMessage.indexOf(","));
        	
        	message.cId = Integer.parseInt(head);
        	
            this.nextFilter.filter(message);
            CowCache.commandMap.get(message.cId).process(message.dealMessage);
        }

}
