package com.bbcow.controller;

import java.io.IOException;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.bbcow.CowCache;
import com.bbcow.CowSession;
import com.bbcow.util.RequestParam;

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

                try {
                        session.getBasicRemote().sendText(RequestParam.returnJson(RequestParam.MESSAGE_TYPE_CHAT, "{\"fakeName\":\"八牛号外\",\"msg\":\"欢迎\"}"));
                } catch (IOException e) {
                        e.printStackTrace();
                }

        }
}
