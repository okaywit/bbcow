package com.bbcow;

import javax.websocket.Session;

/**
 * �Ự����
 * 
 * @author ���Face
 */
public class CowSession {
        private long id;
        private Session session;

        public CowSession(long id, Session session) {
                this.id = id;
                this.session = session;
        }

        public long getId() {
                return id;
        }

        public void setId(long id) {
                this.id = id;
        }

        public Session getSession() {
                return session;
        }

        public void setSession(Session session) {
                this.session = session;
        }

}
