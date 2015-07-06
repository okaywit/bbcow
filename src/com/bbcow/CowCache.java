package com.bbcow;

import java.util.HashMap;
import java.util.Map;

import com.bbcow.filter.AbstractFilter;
import com.bbcow.filter.MessageFilter;
import com.bbcow.filter.ProtocolFilter;
import com.bbcow.handle.Command01;
import com.bbcow.handle.ICommand;

/**
 * »º´æ
 * 
 * @author ´ó»ÔFace
 */
public class CowCache {
        public static Map<String, CowSession> cowMap = new HashMap<String, CowSession>();

        public static Map<Integer, ICommand> commandMap = new HashMap<Integer, ICommand>();

        public static AbstractFilter filterChain = new AbstractFilter() {
                @Override
                public boolean filter(String message) {
                        AbstractFilter protocolFilter = new ProtocolFilter();
                        AbstractFilter messageFilter = new MessageFilter();
                        protocolFilter.setNextFilter(messageFilter);

                        return protocolFilter.filter(message);
                }
        };

        static {
                commandMap.put(1, new Command01());
        }
}
