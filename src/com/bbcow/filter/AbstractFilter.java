package com.bbcow.filter;

/**
 * 指令检测链
 */
public abstract class AbstractFilter {
        protected AbstractFilter nextFilter;

        public void setNextFilter(AbstractFilter nextFilter) {
                this.nextFilter = nextFilter;
        }

        public abstract boolean filter(String message);
}
