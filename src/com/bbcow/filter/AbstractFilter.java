package com.bbcow.filter;

/**
 * 指令检测链
 */
public abstract class AbstractFilter {
        protected AbstractFilter nextFilter;

        public void setNextFilter(AbstractFilter nextFilter) {
                this.nextFilter = nextFilter;
        }

        public abstract void filter(Message message);
        
        
        public static void startChain(String message){
        	AbstractFilter protocolFilter = new ProtocolFilter();
            AbstractFilter messageFilter = new MessageFilter();
            
            protocolFilter.setNextFilter(messageFilter);
            protocolFilter.filter(new Message(message));
        }
        
        static class Message{
        	int cId;
        	String originMessage;
        	String dealMessage;
        	Message(String message){
        		this.originMessage = message;
        	}
        	
        }
}
