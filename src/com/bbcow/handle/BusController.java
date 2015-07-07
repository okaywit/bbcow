package com.bbcow.handle;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.atomic.AtomicLong;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.alibaba.fastjson.JSONObject;
import com.bbcow.CowCache;
import com.bbcow.CowSession;
import com.bbcow.db.MongoPool;
import com.bbcow.util.RequestParam;

/**
 * 中央控制器
 * 
 * @author 大辉Face
 */
@ServerEndpoint("/bb")
public class BusController {
        private volatile static AtomicLong cowIndex = new AtomicLong();
        private static Logger logger = Logger.getLogger(BusController.class);

        static {
                try {
                        PropertyConfigurator.configure(new URL("http://127.0.0.1/log4j.properties"));
                } catch (MalformedURLException e) {
                        e.printStackTrace();
                }
        }

        @OnOpen
        public void open(Session session) {
                long index = cowIndex.getAndIncrement();
                CowCache.cowMap.put(session.getId(), new CowSession(index, session));
                logger.info(session.getId() + " come in! ");
                try {
                        for (String s : MongoPool.findAllWithJson()) {
                                session.getBasicRemote().sendText(RequestParam.returnJson(1, s));
                        }

                } catch (IOException e) {
                        e.printStackTrace();
                }
        }

        @OnMessage
        public void message(String message, Session session) {
                boolean result = CowCache.filterChain.filter(message);
                if (result) {
                        JSONObject object = JSONObject.parseObject(message);
                        CowCache.commandMap.get(object.getInteger("cId")).process(object.getString("data"));
                } else {
                        try {
                                session.getBasicRemote().sendText(RequestParam.returnJson(0, "{}"));
                        } catch (IOException e) {
                                e.printStackTrace();
                        }
                }
        }

        @OnClose
        public void close(Session session) {
                logger.info(session.getId() + " go away! ");
                CowCache.cowMap.remove(session.getId());
        }

        @OnError
        public void error(Throwable t) {
                t.printStackTrace();
        }

}
