package com.bbcow;

import java.util.HashMap;
import java.util.Map;

import com.bbcow.handle.Command01;
import com.bbcow.handle.ICommand;

/**
 * ����
 * 
 * @author ���Face
 */
public class CowCache {
        public static Map<String, CowSession> cowMap = new HashMap<String, CowSession>();

        public static Map<Integer, ICommand> commandMap = new HashMap<Integer, ICommand>();

        static {
                commandMap.put(1, new Command01());
        }
}
