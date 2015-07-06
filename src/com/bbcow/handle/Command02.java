package com.bbcow.handle;

import java.io.IOException;
import java.util.Iterator;

import javax.websocket.Session;

import com.alibaba.fastjson.JSONObject;
import com.bbcow.CowCache;
import com.bbcow.CowSession;
import com.bbcow.db.MongoPool;
import com.bbcow.po.Paper;
import com.bbcow.util.RequestParam;

/**
 * @author 大辉Face
 */
public class Command02 implements ICommand {

        @Override
        public void process(String message) {
                JSONObject object = JSONObject.parseObject(message);
                System.out.println(message);

        }

}
