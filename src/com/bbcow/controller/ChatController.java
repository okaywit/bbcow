package com.bbcow.controller;

import java.io.IOException;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.bbcow.CowCache;
import com.bbcow.CowSession;
import com.bbcow.db.MongoPool;
import com.bbcow.util.RequestParam;
import com.mongodb.Mongo;

/**
 * 聊天
 * 
 * @author 大辉Face
 */
@ServerEndpoint("/chat")
public class ChatController extends BusController {
        @OnOpen
        @Override
        public void open(Session session) {

                long index = cowIndex.getAndIncrement();
                CowCache.cowMap.put(session.getId(), new CowSession(index, session));
                String dailyTop = MongoPool.findDailyFirst();
                try {
                		if(dailyTop!=null)
                			session.getBasicRemote().sendText(RequestParam.returnJson(RequestParam.MESSAGE_TYPE_PUSH, dailyTop));
                } catch (IOException e) {
                        e.printStackTrace();
                }

        }
}
