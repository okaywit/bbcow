package com.bbcow.controller;

import java.io.IOException;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.bbcow.CowCache;
import com.bbcow.CowSession;
import com.bbcow.ServerConfigurator;
import com.bbcow.db.MongoPool;
import com.bbcow.util.RequestParam;

/**
 * 聊天
 * 
 * @author 大辉Face
 */
@ServerEndpoint(value = "/chat", configurator = ServerConfigurator.class)
public class ChatController extends AbstractController {
        @OnOpen
        @Override
        public void open(Session session) {

                long index = cowIndex.getAndIncrement();
                CowCache.cowMap.put(session.getId(), new CowSession(index, session));
                String dailyTop = MongoPool.findDailyFirst();
                try {
                        if (dailyTop != null)
                                session.getBasicRemote().sendText(RequestParam.returnJson(RequestParam.MESSAGE_TYPE_PUSH, dailyTop));
                } catch (IOException e) {
                        e.printStackTrace();
                }

        }
}
